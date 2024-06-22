import { formatCurrency } from "../../utilities/helperFunctions";
import { orderItemProps } from "../../utilities/Types";
function OrderItem(order: orderItemProps) {
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span>{order.items.quantity}&times;</span>
          {order.items.name}
        </p>
        <p>{formatCurrency(order.items.totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
