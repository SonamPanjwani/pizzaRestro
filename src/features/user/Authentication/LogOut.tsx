import { useNavigate } from "react-router-dom";
import { logOff } from "../../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setStatusLogin } from "../userSlice";

import { useAppSelector } from "../../../store";
import { useEffect } from "react";
import UserName from "../UserName";
import { supabase } from "../../../services/client";
import { clearCart } from "../../cart/cartSlice";
import { priorityOrder } from "../../order/orderSlice";

function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state.user.statusLogin);
  const username = useAppSelector((state) => state.user.username);

  // yaha hum status retrieve kiye hai logout ka
  useEffect(() => {
    console.log(status);
    console.log(username);
  }, [status, username]);

  async function handleClick() {
    logOff();
    dispatch(setStatusLogin(false));
    dispatch(clearCart());
    dispatch(priorityOrder(false));

    navigate("/thankyou");
    try {
      const response = await supabase.from("Cart").delete().select("*");
      console.log(response);
    } catch (error) {
      console.log("errrr");
    }
  }

  return (
    <>
      <div className="flex flex-row gap-2">
        <UserName />
        <button
          className="mt-4 ml-2 tracking-wide text-stone-800 font-semibold md:block bg-yellow-500 px-2 rounded-full"
          onClick={handleClick}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default LogOut;
