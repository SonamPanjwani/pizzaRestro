export type item = {
  pizzaID: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image_url?: string;
};

export type cartType = {
  pizzaID: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  item?: item;
}[];

export type pizzaProp = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

export type orderProp = {
  id: number;
  customer: string;
  phone: number | string;
  address: string;
  priority: boolean | string;
  estimatedDelivery: Date;
  cart: {
    pizzaID: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  position: number | string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
};
export type loaderParams = {
  params: {
    orderId: number | string;
  };
};
