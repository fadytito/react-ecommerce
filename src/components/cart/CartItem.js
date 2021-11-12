import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../../context/cart-context";
import formatPrice from "../../utils/format-price";
import AmountController from "./AmountController";

const Cartitem = ({ item }) => {
  const { addItemHandler, removeItemHandler, deleteItemHandler } =
    useCartContext();

  const { image, name, color, price, amount } = item;

  return (
    <article className="cart-item">
      <div className="title">
        <img src={image} alt={name} />
        <div>
          <h5 className="name">{name}</h5>
          <p className="color">
            color : <span style={{ background: color }}></span>
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <AmountController
        amount={amount}
        onIncrease={() => addItemHandler(item)}
        onDecrease={() => removeItemHandler(item)}
      />
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => deleteItemHandler(item)}
      >
        <FaTrash />
      </button>
    </article>
  );
};

export default Cartitem;
