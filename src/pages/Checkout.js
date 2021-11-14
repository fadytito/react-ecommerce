import React from "react";
import { Link } from "react-router-dom";
import { Payment } from "../components";
import { useCartContext } from "../context/cart-context";
import { Breadcrumb } from "../layout";

const Checkout = () => {
  const { cart } = useCartContext();

  return (
    <React.Fragment>
      <Breadcrumb title="Checkout" />
      <div className="section-center checkout">
        {cart.length === 0 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <Payment />
        )}
      </div>
    </React.Fragment>
  );
};

export default Checkout;
