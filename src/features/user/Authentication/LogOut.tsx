import { useNavigate } from "react-router-dom";
import { logOff } from "../../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setStatusLogin } from "../userSlice";

import { useAppSelector } from "../../../store";
import { useEffect } from "react";
import UserName from "../UserName";

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

  function handleClick() {
    logOff();
    dispatch(setStatusLogin(false));
    navigate("/thankyou");
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
