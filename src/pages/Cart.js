import React, { useMemo } from "react";
import { useCartContext } from "../context/cart-context";

const Cart = () => {
  const {
    cart,
    addItemHandler,
    removeItemHandler,
    deleteItemHandler,
    clearCartHandler,
  } = useCartContext();

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.amount * item.price, 0),
    [cart]
  );
  const shippingFee = useMemo(
    () =>
      cart.reduce((acc, item) => {
        let fee = acc;
        if (!item.shipping) {
          fee = fee + item.amount * 1.1;
        }
        return fee;
      }, 0),
    [cart]
  );
  return (
    <div>
      {cart.length > 0 &&
        cart.map((item) => (
          <div>
            <p>
              {item.name}
              <span>
                ({item.amount})
                <button onClick={() => addItemHandler(item)}>add</button>
                <button onClick={() => removeItemHandler(item)}>remove</button>
                <button onClick={() => deleteItemHandler(item)}>delete</button>
              </span>
            </p>
          </div>
        ))}
      <button onClick={() => clearCartHandler()}>clear cart</button>
      <div>
        <p>subtotal: {subtotal}</p>
        <p>shipping fee: {shippingFee}</p>
        <p>order total: {subtotal + shippingFee}</p>
      </div>
    </div>
  );
};

export default Cart;
