//import { useSelector } from "react-redux";
// import ButtonStyle from "../../uiComponents/ButtonStyle"; // isko hune reusuable component bana diya hai ab
import { formatCurrency } from "../../utilities/helperFunctions";

//import { RootState } from "../../store";
//import { cartType } from "../../utilities/Types";
import DeleteItem from "./DeleteItem";
import { item } from "../../utilities/Types";

function CartItem(item: item) {
  //const items = useSelector((state: RootState) => state.cart.cart.flat());
  //console.log(item.flat());
  //yaha hamesha array of objects mil rahe hai

  // const { pizzaId, name, quantity, totalPrice } = item;

  console.log(item); // [ { }] // destructure kar k lene se prop object me item aara h //{ }

  //onst objItem = item[0];
  //console.log(...item);

  return (
    <>
      <li className="py-3 sm-flex sm:items-center sm:justify-center">
        <p className="mb-1 sm:mb-0 text-lg text-slate-900 font-semibold">
          {item.quantity}&times; {item.name}
        </p>
        <div className="flex items-center justify-between sm:gap-6">
          <p className="text-lg text-slate-800 font-bold">
            {formatCurrency(item.totalPrice)}
          </p>
          <DeleteItem pizzaID={item.pizzaID} />
        </div>
      </li>
    </>
  );
}

export default CartItem;
