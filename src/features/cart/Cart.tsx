import LinkStyle from "../../uiComponents/LinkStyle";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { clearCart } from "./cartSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useEffect, useState } from "react";
import { setDisplay } from "../user/userSlice";
import { supabase } from "../../services/client";
import { priorityOrder } from "../order/orderSlice";

const Cart: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const cart = useAppSelector((state: RootState) => state.cart.cart.flat());
  const dispatch = useDispatch();

  const [totalAmt, setTotalAmt] = useState<number>(0);
  dispatch(setDisplay(false));
  dispatch(priorityOrder(false));
  console.log(cart); // [{} ,{}]

  useEffect(() => {
    const handleCartAmount = () => {
      const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalAmt(total);
    };

    handleCartAmount();
  }, []);

  async function emptyCart() {
    dispatch(clearCart());
    const response = await supabase.from("Cart").delete().select("*");
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className=" px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35 ">
      <LinkStyle to="/menu">&larr; Back to Menu </LinkStyle>
      <h2 className="mt-7 text-2xl font-bold text-slate-900 capitalize">
        Your Cart {username}
      </h2>

      <ul className="divide-y divide-stone-200 border-b mt-3 ">
        {cart.map((item) => {
          return <CartItem item={item} key={item.pizzaID} />;
        })}
      </ul>

      <div className="flex mt-6 space-x-2 justify-between ">
        <div className="text-stone-900 font-semibold text-xl">
          Your Total Amount comes to be : ₹ {totalAmt}
        </div>
        <div className=" flex flex-row gap-2">
          <ButtonStyle to="/order/new" type="primary">
            Order pizzas
          </ButtonStyle>

          <ButtonStyle type="secondary" onClick={emptyCart}>
            Clear Cart
          </ButtonStyle>
        </div>
      </div>
    </div>
  );
};
export default Cart;
