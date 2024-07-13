//import { useSelector } from "react-redux";
// import ButtonStyle from "../../uiComponents/ButtonStyle"; // isko hune reusuable component bana diya hai ab
//import { item } from "../../utilities/Types";
import { formatCurrency } from "../../utilities/helperFunctions";

//import { RootState } from "../../store";
//import { cartType } from "../../utilities/Types";
import DeleteItem from "./DeleteItem";
import { item } from "../../utilities/Types";
import UpdateItem from "./UpdateItem";
// import { supabase } from "../../services/client";
// import { useEffect } from "react";

type itemType = {
  item: item;
};
function CartItem(item: itemType) {
  console.log(item);
  return (
    <>
      <li className="py-3 flex flex-row sm-flex sm:items-center sm:justify-between">
        <div className="flex flex-row gap-5 ">
          <img
            src={item.item.image_url}
            alt={item.item.name}
            className="h-24"
          />
          <div className="flex flex-col gap-3">
            <p className="mb-1 sm:mb-0 text-lg text-slate-900 font-semibold">
              {item.item.quantity}&times; {item.item.name}
            </p>

            <p className="text-lg text-slate-800 font-bold">
              {formatCurrency(item.item.totalPrice)}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
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
