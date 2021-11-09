import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart-context";

const Cartbtn = () => {
  const { itemsCount } = useCartContext();
  return (
    <div>
      <Link to="/cart">Cart ({itemsCount})</Link>
    </div>
  );
};

export default Cartbtn;
