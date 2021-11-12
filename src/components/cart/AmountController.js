import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MAX_ITEM_COUNT } from "../../constants/cart-constants";

const AmountController = ({ onIncrease, onDecrease, amount = 1 }) => {
  return (
    <div className="amount-controller">
      <button
        type="button"
        className="amount-btn"
        disabled={amount === 1}
        onClick={onDecrease}
      >
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button
        type="button"
        className="amount-btn"
        disabled={amount === MAX_ITEM_COUNT}
        onClick={onIncrease}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AmountController;
