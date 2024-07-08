import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getTotalQty, getTotalPrice } from "./cartSlice";
import { useAppSelector } from "../../store";

function CartOverview() {
  const totalqty = useSelector(getTotalQty);
  const totalPrice = useSelector(getTotalPrice);
  const status = useAppSelector((state) => state.user.statusLogin);
  if (!totalqty) return null;

  return (
    <>
      {status && (
        <div
          className=" flex items-center justify-between 
       bg-stone-800 text-stone-200 text-sm 
       uppercase px-4 py-4 sm:px-6 md:text-base "
        >
          <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
            <span>{totalqty} pizzas</span>
            <span>₹ {totalPrice}</span>
          </p>
          <Link to="/cart">Open Cart &rarr;</Link>
        </div>
      )}
    </>
  );
}

export default CartOverview;
