import {
  ADD_ITEM,
  CLEAR_CART,
  DELETE_ITEM,
  REMOVE_ITEM,
} from "../actions/cart-actions";
import { MAX_ITEM_COUNT } from "../constants/cart-constants";

const cartRedeucer = (state, action) => {
  const { type, payload } = action;
  let cartItem;
  let updatedCartItem;
  let updatedCart;
  switch (type) {
    case ADD_ITEM:
      const { item, amount } = payload;
      cartItem = state.find(
        (cartItem) => cartItem.id === item.id && cartItem.color === item.color
      );
      if (cartItem) {
        if (cartItem.amount + amount >= MAX_ITEM_COUNT) {
          updatedCartItem = { ...cartItem, amount: MAX_ITEM_COUNT };
        } else {
          updatedCartItem = { ...cartItem, amount: cartItem.amount + amount };
        }
        updatedCart = state.map((cartItem) => {
          if (
            cartItem.id === updatedCartItem.id &&
            cartItem.color === updatedCartItem.color
          ) {
            return updatedCartItem;
          } else {
            return cartItem;
          }
        });
        return updatedCart;
      } else {
        return [...state, { ...item, color: item.color, amount }];
      }
    case REMOVE_ITEM:
      cartItem = state.find((cartItem) => cartItem.id === payload.id);
      if (cartItem.amount === 1) return state;
      updatedCartItem = { ...cartItem, amount: cartItem.amount - 1 };
      updatedCart = state.map((cartItem) => {
        if (cartItem.id === updatedCartItem.id) {
          return updatedCartItem;
        } else {
          return cartItem;
        }
      });
      return updatedCart;
    case DELETE_ITEM:
      cartItem = state.find((cartItem) => cartItem.id === payload.id);
      updatedCart = state.filter((item) => item.id !== cartItem.id);
      return updatedCart;
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export default cartRedeucer;
