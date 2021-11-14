import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  ADD_ITEM,
  CLEAR_CART,
  DELETE_ITEM,
  REMOVE_ITEM,
} from "../actions/cart-actions";
import { SHIPPING_FEE } from "../constants/cart-constants";
import cartRedeucer from "../reducers/cart-reducer";

const CartContext = React.createContext();

const cartInitialValue = [];

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartRedeucer, cartInitialValue, () =>
    JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : cartInitialValue
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const itemsCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.amount, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.amount * item.price, 0),
    [cart]
  );
  const hasShipmentFee = cart.some((item) => !item.shipping);

  const shipmentFee = hasShipmentFee ? SHIPPING_FEE : 0;

  const total = subtotal + shipmentFee;

  const addItemHandler = useCallback(
    (item, amount = 1) => {
      dispatchCart({
        type: ADD_ITEM,
        payload: { item, amount },
      });
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
        subtotal,
        shipmentFee,
        total,
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

