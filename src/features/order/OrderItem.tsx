import { formatCurrency } from "../../utilities/helperFunctions";
import { item } from "../../utilities/Types";
function OrderItem(order: item) {
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span>{order.quantity}&times;</span>
          {order.name}
        </p>
        <p>{formatCurrency(order.totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
