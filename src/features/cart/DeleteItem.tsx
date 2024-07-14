import { useDispatch } from "react-redux";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { deleteItem } from "./cartSlice";
import { supabase } from "../../services/client";

type pizzaIDtype = {
  pizzaID: number;
};
function DeleteItem(pizzaID: pizzaIDtype) {
  const dispatch = useDispatch();
  // console.log(pizzaID);
  async function handleDelete() {
    dispatch(deleteItem(pizzaID.pizzaID));
    try {
      const response = await supabase
        .from("Cart")
        .delete()
        .eq("pizzaId", pizzaID.pizzaID)
        .select();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ButtonStyle type="small" onClick={handleDelete}>
      Delete
    </ButtonStyle>
  );
}

export default DeleteItem;
