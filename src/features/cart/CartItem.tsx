//import { useSelector } from "react-redux";
// import ButtonStyle from "../../uiComponents/ButtonStyle"; // isko hune reusuable component bana diya hai ab
//import { item } from "../../utilities/Types";
import { formatCurrency } from "../../utilities/helperFunctions";

//import { RootState } from "../../store";
//import { cartType } from "../../utilities/Types";
import DeleteItem from "./DeleteItem";
import { item } from "../../utilities/Types";
import UpdateItem from "./UpdateItem";
type itemType = {
  item: item;
};
function CartItem(item: itemType) {
  console.log(item); // here item is object

  return (
    <>
      <li className="py-3  sm-flex sm:items-center sm:justify-center">
        <p className="mb-1 sm:mb-0 text-lg text-slate-900 font-semibold">
          {item.item.quantity}&times; {item.item.name}
        </p>
        <div className="flex  justify-between sm:gap-6">
          <p className="text-lg text-slate-800 font-bold">
            {formatCurrency(item.item.totalPrice)}
          </p>
          <span className="flex gap-4">
            <UpdateItem pizzaID={item.item.pizzaID} qty={item.item.quantity} />

            <DeleteItem pizzaID={item.item.pizzaID} />
          </span>
        </div>
      </li>
    </>
  );
}

export default CartItem;
