//import { useState } from "react";

import { Form, useNavigation } from "react-router-dom";

//import { orderProp } from "../../utilities/Types";
//import { createOrder } from "../../services/apiRestaurant";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { supabase } from "../../services/client";

function CreateOrder() {
  const cart = useSelector((state: RootState) => state.cart.cart.flat());
  console.log(cart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((state: RootState) => state.user.username);
  if (!cart.length) return <EmptyCart />;
  async function handleclick() {
    console.log("handle clik");

    try {
      for (const item of cart) {
        const currCart = {
          pizzaId: item.pizzaID,
          name: item.name,
          unitPrice: item.unitPrice,

          quantity: item.quantity,
          totalPrice: item.unitPrice * item.quantity,
        };
        console.log(currCart);

        const { data, error } = await supabase.from("Cart").insert(currCart);
        if (error) {
          console.error("Error inserring");
          throw error;
        }
        console.log("data inserted ", data);
      }
    } catch (error) {
      console.log("Error Inserting data");
    }
  }

  return (
    <>
      <div className="px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35 ">
        <h2 className="text-[35px]  text-stone-900 font-semibold mb-8">
          Ready to Order? Let's Order then !!
        </h2>
        <Form>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
              First Name
            </label>
            <input
              className="input grow  text-stone-900 capitalize"
              type="text"
              name="Customer"
              defaultValue={username}
              required
            />
          </div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
              Contact No.
            </label>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="Phone"
                required
              />
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
              Address
            </label>
            <div className="grow ">
              <input
                className="input w-full"
                type="text"
                name="Address"
                required
              />
            </div>
          </div>
          <div className="mb-12  flex gap-5 items-center">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none
              focus:ring focus:ring-offset-2 focus:ring-yellow-400"
              type="checkbox"
              name="priority"
              id="priority"
            />
            <label
              htmlFor="priority"
              className="  text-stone-900 font-semibold text-lg"
            >
              Want to place your order as priority?
            </label>
          </div>
          <div>
            {/* <input type="hidden" name="cart" value={JSON.stringify(cart)} /> */}
            <ButtonStyle
              disabled={isSubmitting}
              type="primary"
              onClick={handleclick}
            >
              {isSubmitting ? "Placing order ..." : "Order Now!!"}
            </ButtonStyle>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateOrder;
