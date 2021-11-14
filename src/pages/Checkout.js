import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart-context";
import { Breadcrumb } from "../layout";

const Checkout = () => {
  const { cart } = useCartContext();

  return (
    <div className="checkout-page">
      <Breadcrumb title="Checkout" />
      {cart.length === 0 ? (
        <div className="empty">
          <h2>your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      ) : (
        <p>stripe payment</p>
      )}
    </div>
  );
};

export default Checkout;
