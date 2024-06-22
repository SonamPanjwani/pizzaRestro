import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getTotalQty, getTotalPrice } from "./cartSlice";
// state.cart.cart.reduce((sum: number, item) => sum + item.quantity, 0)
function CartOverview() {
  const totalqty = useSelector(getTotalQty);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalqty) return null;

  //this function here we will generalise this by keeping that in cartslice so as to use later
  // const currentstate = useSelector((state: RootState) => state.cart.cart);
  // console.log(currentstate);
  // const arrCurrentState = currentstate.flat();
  // console.log(arrCurrentState);

  // const totalqty = arrCurrentState.reduce(
  //   (sum: number, item) => sum + item.quantity,
  //   0
  // );
  // console.log(totalqty);

  return (
    <>
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
    </>
  );
}

export default CartOverview;
