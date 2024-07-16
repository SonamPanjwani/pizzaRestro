import { useDispatch } from "react-redux";

import { clearCart } from "../features/cart/cartSlice";

import { useNavigate } from "react-router-dom";

function BackHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClickHome() {
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <button
      className=" tracking-widest text-stone-800 font-semibold md:block "
      onClick={handleClickHome}
    >
      {" "}
      HOME
    </button>
  );
}

export default BackHome;
