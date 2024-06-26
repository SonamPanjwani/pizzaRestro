import { createSlice } from "@reduxjs/toolkit";

import { cartType } from "../../utilities/Types";
import { RootState } from "../../store";

type initialStateType = {
  cart: cartType;
};

const initialState: initialStateType = {
  cart: [
    // {
    //   //taking fake data for checking purpose
    //   pizzaID: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload =newItem

      state.cart.push(action.payload);
      // console.log(action.payload);

      // console.log(state);
    },
    deleteItem(state, action) {
      //pizza id
      // console.log(state);
      // console.log(state.cart);
      console.log(action.payload);
      const currState = state.cart.flat();

      console.log(currState);
      state.cart = currState.filter((item) => {
        return item.pizzaID !== action.payload;
      });
      console.log(state.cart);
    },
    increaseItemQty(state, action) {
      const currState = state.cart.flat();
      const item = currState.find((item) => {
        return item.pizzaID === action.payload;
      });
      if (item) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQty(state, action) {
      const currState = state.cart.flat();
      const item = currState.find((item) => {
        return item.pizzaID === action.payload;
      });
      // if (item && item.quantity > 1) {
      //   item.quantity--;
      //   item.totalPrice = item.unitPrice * item.quantity;
      // } this is working great but another logic if we encounter a 0
      if (item) {
        if (item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        } else if (item.quantity > 0) {
          item.quantity--;
          item.totalPrice = item.unitPrice * item.quantity;
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalQty = (state: RootState) => {
  const currentstate = state.cart.cart;
  //console.log(currentstate);
  const arrCurrentState = currentstate.flat();
  //console.log(arrCurrentState);

  const totalqty = arrCurrentState.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );
  //console.log(totalqty);
  return totalqty;
};
export const getTotalPrice = (state: RootState) => {
  const arrCurrentState = state.cart.cart.flat();
  const totalPrice = arrCurrentState.reduce(
    (sum: number, item) => sum + item.totalPrice,
    0
  );
  return totalPrice;
};

export const getCart = (state: RootState) => {
  const currentCart = state.cart.cart.flat();
  console.log(currentCart);

  return currentCart;
};
