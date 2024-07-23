import { useDispatch } from "react-redux";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { decreaseItemQty, increaseItemQty } from "./cartSlice";
import { supabase } from "../../services/client";

type pizzaIDtype = {
  pizzaID: number;
  qty: number;
  unitPrice: number;
};

function UpdateItem({ pizzaID, qty, unitPrice }: pizzaIDtype) {
  const dispatch = useDispatch();

  async function handleUpdateCartInc() {
    // console.log("function called");
    dispatch(increaseItemQty(pizzaID));
    try {
      const newQty = qty + 1;
      const totalP = unitPrice * newQty;
      const { error } = await supabase
        .from("Cart")
        .update({ quantity: newQty, totalPrice: totalP })
        .eq("pizzaId", pizzaID);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateCartDec() {
    // console.log("function called");
    dispatch(decreaseItemQty(pizzaID));
    try {
      if (qty === 1) {
        const response = await supabase
          .from("Cart")
          .delete()
          .eq("pizzaId", pizzaID);
        console.log(response);
      }
      if (qty >= 1) {
        const newQty = qty - 1;
        const totalP = unitPrice * newQty;
        const { error } = await supabase
          .from("Cart")
          .update({ quantity: newQty, totalPrice: totalP })
          .eq("pizzaId", pizzaID);
        if (error) throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex gap-3 items-center">
      <ButtonStyle type="round" onClick={handleUpdateCartDec}>
        {" "}
        -{" "}
      </ButtonStyle>
      <span className="font-semibold text-lg mt-3 mx-2 text-stone-900">
        {qty}
      </span>
      <ButtonStyle type="round" onClick={handleUpdateCartInc}>
        {" "}
        +{" "}
      </ButtonStyle>
    </div>
  );
}

export default UpdateItem;
