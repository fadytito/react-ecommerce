import React, { useCallback, useContext, useMemo, useReducer } from "react";
import {
  ADD_ITEM,
  CLEAR_CART,
  DELETE_ITEM,
  REMOVE_ITEM,
} from "../actions/cart-actions";
import cartRedeucer from "../reducers/cart-reducer";

const CartContext = React.createContext();

const cartInitialValue = [];

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartRedeucer, cartInitialValue);

  const itemsCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.amount, 0),
    [cart]
  );

  const addItemHandler = useCallback(
    (item, amount = 1) => {
      dispatchCart({ type: ADD_ITEM, payload: { item, amount } });
    },
    [dispatchCart]
  );

  const removeItemHandler = useCallback(
    (item) => {
      dispatchCart({ type: REMOVE_ITEM, payload: item });
    },
    [dispatchCart]
  );

  const deleteItemHandler = useCallback(
    (item) => {
      dispatchCart({ type: DELETE_ITEM, payload: item });
    },
    [dispatchCart]
  );

  const clearCartHandler = useCallback(
    (item) => {
      dispatchCart({ type: CLEAR_CART });
    },
    [dispatchCart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        itemsCount,
        addItemHandler,
        removeItemHandler,
        deleteItemHandler,
        clearCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { useCartContext, CartProvider };
