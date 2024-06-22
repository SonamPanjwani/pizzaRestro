import { useDispatch } from "react-redux";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { decreaseItemQty, increaseItemQty } from "./cartSlice";
type pizzaIDtype = {
  pizzaID: number;
  qty: number;
};
function UpdateItem({ pizzaID, qty }: pizzaIDtype) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-3 items-center">
      <ButtonStyle
        type="round"
        onClick={() => dispatch(decreaseItemQty(pizzaID))}
      >
        {" "}
        -{" "}
      </ButtonStyle>
      <span className="font-semibold text-lg mt-3 mx-2 text-stone-900">
        {qty}
      </span>
      <ButtonStyle
        type="round"
        onClick={() => dispatch(increaseItemQty(pizzaID))}
      >
        {" "}
        +{" "}
      </ButtonStyle>
    </div>
  );
}

export default UpdateItem;
