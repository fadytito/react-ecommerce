import React from "react";
import Cartitem from "./CartItem";

const Cartlist = ({ cart }) => {
  return (
    <div className="cart-list">
      <div className="cart-columns">
        <div className="content">
          <h5>item</h5>
          <h5>price</h5>
          <h5>quantity</h5>
          <h5>subtotal</h5>
          <span></span>
        </div>
        <hr />
      </div>
      {cart.map((item) => (
        <Cartitem key={item.id + item.color} item={item} />
      ))}
    </div>
  );
};

export default Cartlist;
