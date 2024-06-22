import { useDispatch } from "react-redux";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { deleteItem } from "./cartSlice";
//import { cartType } from "../../utilities/Types";

type pizzaIDtype = {
  pizzaID: number;
};
function DeleteItem(pizzaID: pizzaIDtype) {
  const dispatch = useDispatch();
  // console.log(pizzaID);
  const handleDelete = () => {
    const item = dispatch(deleteItem({ pizzaID }));
    console.log(item);
  };
  return (
    <ButtonStyle type="small" onClick={handleDelete}>
      Delete
    </ButtonStyle>
  );
}

export default DeleteItem;
