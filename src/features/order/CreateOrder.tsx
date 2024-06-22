//import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { cartType, orderProp } from "../../utilities/Types";
import { createOrder } from "../../services/apiRestaurant";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const isValidPhoneNumber = (num: number): boolean => {
  const str = num.toString();
  const phoneRegex = /^(\+91[- ]?)?\d{10}$/;
  return phoneRegex.test(str);
};

const fakeCart: cartType[] = [
  {
    pizzaID: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaID: 6,
    name: "Vegetable",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaID: 11,
    name: "Spinach & Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
type errorType = {
  phone?: string;
};

function CreateOrder() {
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as errorType;

  const username = useSelector((state: RootState) => state.user.username);

  return (
    <>
      <div className="px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35 ">
        <h2 className="text-[35px]  text-stone-900 font-semibold mb-8">
          Ready to Order? Let's Order then !!
        </h2>
        <Form method="POST">
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
              {formErrors?.phone && (
                <p className="text-xs mt-2 text-red-700 p-2 rounded-md">
                  {formErrors.phone}
                </p>
              )}
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
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <ButtonStyle disabled={isSubmitting} type="primary">
              {isSubmitting ? "Placing order ..." : "Order Now!!"}
            </ButtonStyle>
          </div>
        </Form>
      </div>
    </>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  const order: orderProp = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  console.log(order);

  const errors: errorType = {};
  if (!isValidPhoneNumber(order.phone)) {
    errors.phone =
      "Please give us your correct phone number . We might need it to connect with you.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  // if all good then only create new order

  const newOrder = await createOrder(order);
  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
