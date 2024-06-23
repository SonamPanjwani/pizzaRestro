import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helperFunctions";
import { orderProp, loaderParams } from "../../utilities/Types";
//import { useSelector } from "react-redux";
//import { RootState } from "../../store";
//import CartItem from "../cart/CartItem";
//import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData() as orderProp;
  //const cart = useSelector((state: RootState) => state.cart.cart.flat());
  const deliveryIn = calcMinutesLeft(order.estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div
        className="flex items-center justify-between
      flex-wrap gap-2"
      >
        <h2 className="text-xl font-semibold">Order #{order.id}Status</h2>
        <div className="spaxe-x-2">
          {order.priority && (
            <span className="rounded-full py-1 text-sm bg-red-500 font-semibold uppercase tracking-wide text-red-50">
              Priority Order
            </span>
          )}
          <span className="rounded-full py-1 text-sm bg-green-500 font-semibold uppercase tracking-wide text-green-50">
            {order.status} Order
          </span>
        </div>
        <div
          className="flex items-center justify-between
      flex-wrap gap-2 bg-stone-200 px-6 py-5"
        >
          <p className="font-medium">
            {deliveryIn >= 0
              ? `Only ${deliveryIn} minutes left`
              : `Order Should have Arrived`}
          </p>
          <p className="text-xs text-stone-500">
            ( Estimated Delivery : {formatDate(order.estimatedDelivery)})
          </p>
        </div>
        <ul className="divide-y divide-stone-200 border-b border-t"></ul>
        <div className="space-y-2 bg-stone-200 px-6 py-5">
          <p className="text-sm font-medium text-stone-600">
            Price Pizza:{formatCurrency(order.orderPrice)}
          </p>

          {order.priority && (
            <p className="text-sm font-medium text-stone-600">
              {" "}
              Price Priority : {formatCurrency(order.priorityPrice)}
            </p>
          )}
          <p className="text-sm font-bold text-stone-600">
            Amount to be Paid at the time of delivery:
            {formatCurrency(order.orderPrice + order.priorityPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}
export async function loader(params: loaderParams) {
  console.log(params.params.orderId);
  const order = await getOrder(params.params.orderId);
  return order;
}
export default Order;
