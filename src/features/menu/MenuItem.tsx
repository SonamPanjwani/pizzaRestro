import { useDispatch } from "react-redux";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { formatCurrency } from "../../utilities/helperFunctions";
import { item, pizzaProp } from "../../utilities/Types";
import { addItem, getElementById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UpdateItem from "../cart/UpdateItem";
import { supabase } from "../../services/client";

function MenuItem({ pizza }: { pizza: pizzaProp }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart.flat());

  console.log(cart);
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector((state: RootState) =>
    getElementById(state, id)
  );
  console.log(currentQuantity);
  const isInCart = currentQuantity > 0;

  async function handleAddToCart() {
    const newItem: item = {
      pizzaID: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
      image_url: imageUrl,
    };
    console.log(newItem);
    const qty = newItem.quantity;
    console.log(qty);
    dispatch(addItem(newItem));

    try {
      const { error } = await supabase.from("Cart").insert({
        pizzaId: newItem.pizzaID,
        name: newItem.name,
        unitPrice: newItem.unitPrice,
        quantity: newItem.quantity,
        totalPrice: newItem.unitPrice * newItem.quantity,
        imageUrl: newItem.image_url,
      });

      if (error) {
        console.error("Error inserting ,needs update");

        if (error) {
          console.log("error updating");
        }
      }
    } catch (error) {
      console.error("Error inserting data", error);
    }
  }

  return (
    <>
      <div className=" w-auto flex justigy-between">
        <li className="flex gap-6 sm:gap-3 h-auto w-full py-2">
          <img
            src={imageUrl}
            alt={name}
            className={`
          h-24 ${soldOut ? "opacity-70 grayscale" : " "}`}
          />
          <div className="flex flex-col grow pt-0.5">
            <p className="font-semibold text-base md:text-xl text-slate-950">
              {name}
            </p>
            <p className="text-xs sm:text-sm italic capitalize text-slate-900">
              {ingredients.join(",")}
            </p>
          </div>

          {!soldOut ? (
            <div className="mt-auto flex gap-2 items-center justify-evenly sm:justify-between">
              <p className="text-base sm:text-lg uppercase mx-3 py-1 font-medium text-slate-900">
                {formatCurrency(unitPrice)}
              </p>
              {isInCart ? (
                <div className="flex items-center gap-3 sm:gap-8">
                  <UpdateItem
                    pizzaID={id}
                    qty={currentQuantity}
                    unitPrice={unitPrice}
                  />
                  <DeleteItem pizzaID={id} />
                </div>
              ) : (
                <ButtonStyle type="small" onClick={handleAddToCart}>
                  ADD TO CART
                </ButtonStyle>
              )}
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
      </div>
    </>
  );
}

export default MenuItem;
