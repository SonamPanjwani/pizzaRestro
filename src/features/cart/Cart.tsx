//import { Link } from "react-router-dom";
import LinkStyle from "../../uiComponents/LinkStyle";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { cartType } from "../../utilities/Types";
//import { cartType } from "../../utilities/Types";
// const fakeCart: cartType[] = [
//   {
//     pizzaID: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaID: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaID: 11,
//     name: "Spinach & Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];
const Cart: React.FC = () => {
  //const cart = fakeCart; used earlier to see the output
  const username = useSelector((state: RootState) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

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

      <div className="flex mt-6 space-x-2">
        <ButtonStyle to="/order/new" type="primary">
          Order pizzas
        </ButtonStyle>

        <ButtonStyle type="secondary" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </ButtonStyle>
      </div>
    </div>
  );
};
export default Cart;
