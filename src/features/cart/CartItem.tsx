//import { useSelector } from "react-redux";
// import ButtonStyle from "../../uiComponents/ButtonStyle"; // isko hune reusuable component bana diya hai ab
import { item } from "../../utilities/Types";
import { formatCurrency } from "../../utilities/helperFunctions";

//import { RootState } from "../../store";
//import { cartType } from "../../utilities/Types";
import DeleteItem from "./DeleteItem";
///import { item } from "../../utilities/Types";
type itemType = {
  item: item;
};
function CartItem(item: itemType) {
  //const items = useSelector((state: RootState) => state.cart.cart.flat());
  //console.log(item.flat());
  //yaha hamesha array of objects mil rahe hai

  //const { pizzaId, name, quantity, totalPrice } = item;
  // destructure kar k lene se prop object me item aara h //{ }
  console.log(item); // here item is object

  //const items = Object.values(item);
  //const objItem = item[0];
  //console.log(...item);

  return (
    <>
      <li className="py-3 sm-flex sm:items-center sm:justify-center">
        <p className="mb-1 sm:mb-0 text-lg text-slate-900 font-semibold">
          {item.item.quantity}&times; {item.item.name}
        </p>
        <div className="flex items-center justify-between sm:gap-6">
          <p className="text-lg text-slate-800 font-bold">
            {formatCurrency(item.item.totalPrice)}
          </p>
          <DeleteItem pizzaID={item.item.pizzaID} />
        </div>
      </li>
    </>
  );
}

export default CartItem;
