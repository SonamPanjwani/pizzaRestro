import { useDispatch } from "react-redux";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { formatCurrency } from "../../utilities/helperFunctions";
import { item, pizzaProp } from "../../utilities/Types";
import { addItem } from "../cart/cartSlice";
//import DeleteItem from "../cart/DeleteItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function MenuItem({ pizza }: { pizza: pizzaProp }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart.flat());

  console.log(cart);

  const handleAddToCart = () => {
    const newItem: item = {
      pizzaID: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice * 1,
    };
    console.log(newItem);
    const qty = newItem.quantity;
    console.log(qty);

    dispatch(addItem(newItem));
  };

  return (
    <>
      <li className="flex gap-6 py-2">
        <img
          src={pizza.imageUrl}
          alt={pizza.name}
          className={`
          h-24 ${pizza.soldOut ? "opacity-70 grayscale" : " "}`}
        />
        <div className="flex flex-col grow pt-0.5">
          <p className="font-semibold text-xl text-slate-950">{pizza.name}</p>
          <p className="text-sm  italic capitalize text-slate-900">
            {pizza.ingredients.join(",")}
          </p>
        </div>

        {!pizza.soldOut ? (
          <div className="mt-auto flex gap-2 items-center justify-between">
            <p className="text-lg uppercase mx-3 py-1 font-medium text-slate-900">
              {formatCurrency(pizza.unitPrice)}
            </p>
            {/* //<DeleteItem pizzaID={pizza.id} /> */}
            <ButtonStyle type="small" onClick={handleAddToCart}>
              ADD TO CART
            </ButtonStyle>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between">
            <p className="mx-2 text-slate-200  bg-red-600 rounded-lg px-2 my-1 py-1 text-md">
              Sold Out
            </p>
            <ButtonStyle type="notActive" disabled={true}>
              ADD TO CART
            </ButtonStyle>
          </div>
        )}
      </li>
    </>
  );
}

export default MenuItem;
