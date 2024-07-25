import { useDispatch } from "react-redux";
import { setDisplay } from "../user/userSlice";
import { supabase } from "../../services/client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { item } from "../../utilities/Types";
import ButtonStyle from "../../uiComponents/ButtonStyle";

import { clearCart } from "../cart/cartSlice";
import { priorityOrder } from "./orderSlice";
import { useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderData, setOrderData] = useState<any>([]);
  const navigate = useNavigate();

  dispatch(setDisplay(false));
  const priority = useAppSelector((state) => state.order.priority);
  const status = useAppSelector((state) => state.user.statusLogin);
  //console.log(priority);
  useEffect(() => {
    async function getOrder() {
      try {
        const { data, error } = await supabase.from("Cart").select("*");
        setOrderData(data);

        // console.log(orderData);
        if (error) throw error;
      } catch (error) {
        console.log("Error fetching ORder", error);
      }
    }
    getOrder();
  }, []);

  let priorityPrice = 0;
  let specialdiscount = 0;
  if (status) {
    specialdiscount = 5;
  } else {
    specialdiscount = 0;
  }
  if (priority) {
    priorityPrice = 5;
  } else {
    priorityPrice = 0;
  }
  const total = orderData.reduce((acc: number, item: item) => {
    return acc + item.totalPrice;
  }, 0);
  async function handleClickExit() {
    try {
      const response = await supabase.from("Cart").delete().select("*");
      console.log(response);
    } catch (error) {
      console.log("errrr");
    }
    navigate("/thankyou");
    dispatch(clearCart());
    dispatch(priorityOrder(false));
  }

  return (
    <div className="px-4 py-6  rounded-lg space-y-8 mt-20 bg-yellow-200 bg-opacity-35">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-stone-900  ">
          <h2 className="text-3xl text-stone-900 font-semibold underline">
            Your Order Details
          </h2>
          <div className="spaxe-x-2">
            {priority && (
              <span className="rounded-full py-1 px-3 text-sm bg-red-500 font-semibold uppercase tracking-wide text-red-50">
                Priority Order
              </span>
            )}
          </div>
        </div>

        <div className="divide-y border-b-1 divide-stone-800">
          {orderData.map((item: item, index: number) => (
            <li
              key={index}
              className="py-4 flex text-xl   text-stone-800  font-semibold justify-between"
            >
              <div>
                <h3>
                  {index + 1}
                  {".  "}
                  {item.name}
                </h3>
              </div>
              <div>
                <p>
                  {item.quantity} * ₹{item.unitPrice} = ₹
                  {item.quantity * item.unitPrice}
                </p>
              </div>
            </li>
          ))}
        </div>
        <div className="space-y-2 rounded-lg  bg-yellow-200 bg-opacity-30 px-6 py-5 text-lg font-medium text-stone-800 ">
          <p>Price Pizza: ₹ {total}</p>
          {status && (
            <p>
              special Discount for our privileged Customers = ₹{specialdiscount}
            </p>
          )}
          <p>Price Priority : ₹ {priorityPrice}</p>

          <p>
            Amount to be Paid at the time of delivery: ₹{" "}
            {total + priorityPrice - specialdiscount}
          </p>
        </div>
        <div className="flex flex-row justify-end gap-3">
          <ButtonStyle to="/menu">Order More</ButtonStyle>
          <ButtonStyle to="/cart">Back To Cart</ButtonStyle>
          <ButtonStyle onClick={handleClickExit}>Exit</ButtonStyle>
        </div>
      </div>
    </div>
  );
}

export default Order;
