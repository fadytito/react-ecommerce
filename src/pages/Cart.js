import React from "react";
import { Link } from "react-router-dom";
import { Cartlist, CartSummary } from "../components/cart";
import { useCartContext } from "../context/cart-context";

const Cart = () => {
  const { cart, clearCartHandler } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="cart-page page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page">
      <section className="section section-center">
        <Cartlist cart={cart} />
        <hr />
        <div className="link-container">
          <Link to="/products" className="link-btn">
            continue shopping
          </Link>
          <button
            type="button"
            className="link-btn clear-btn"
            onClick={clearCartHandler}
          >
            clear shopping carts
          </button>
        </div>
        <CartSummary />
      </section>
    </div>
  );
};

export default Cart;
