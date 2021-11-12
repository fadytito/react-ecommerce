import React from "react";
import { Link } from "react-router-dom";
import CartSummary from "../components/cart/CartSummary";
import { useCartContext } from "../context/cart-context";
import Cartlist from "./../components/cart/CartList";

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
        {/* <button onClick={() => clearCartHandler()}>clear cart</button>
      <div>
        <p>subtotal: {subtotal}</p>
        <p>shipping fee: {shippingFee}</p>
        <p>order total: {subtotal + shippingFee}</p>
      </div> */}
        <CartSummary />
      </section>
    </div>
  );
};

export default Cart;
