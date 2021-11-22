import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../../context/cart-context";
import AmountController from "./AmountController";

const AddToCart = ({ product }) => {
  const { colors } = product;
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(colors[0]);
  const { addItemHandler } = useCartContext();
  
  return (
    <section className="addtocart">
      <div className="info">
        <span>colos : </span>
        <div className="colors">
          {colors.map((c) => (
            <div key={c}>
              <input
                type="radio"
                id={c}
                value={c}
                checked={c === color}
                onChange={() => setColor(c)}
                className="color-btn"
              />
              <label htmlFor={c} style={{ backgroundColor: c }}>
                {c === color ? <FaCheck /> : null}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <AmountController
          onIncrease={() => setAmount((a) => a + 1)}
          onDecrease={() => setAmount((a) => a - 1)}
          amount={amount}
        />
        <button
          className="btn"
          onClick={() => addItemHandler({ ...product, color }, amount)}
        >
          add to cart
        </button>
      </div>
    </section>
  );
};

export default AddToCart;
