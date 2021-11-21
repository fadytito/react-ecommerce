import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart-context";

const Cartbtn = () => {
  const { itemsCount } = useCartContext();
  return (
    <Link to="/cart" className="cart-btn">
      <div>Cart</div>
      <span className="cart-container">
        <FaShoppingCart />
        <span className="cart-value">{itemsCount}</span>
      </span>
    </Link>
  );
};

export default Cartbtn;
