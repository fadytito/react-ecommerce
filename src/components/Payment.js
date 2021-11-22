import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCartContext } from "../context/cart-context";
import { useUserContext } from "../context/user-context";
import formatPrice from "../utils/format-price";

const TEST_CARD_NUMBER = "4242 4242 4242 4242";

const Payment = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [isInvalidNumber, setIsInvalidNumber] = useState(false);

  const {
    user: { nickname },
  } = useAuth0();

  const history = useHistory();

  const { cart, clearCartHandler, total } = useCartContext();
  const { addOrder, error } = useUserContext();

  useEffect(() => {
    setDisabled(inputVal.length !== TEST_CARD_NUMBER.length);
  }, [inputVal]);

  const changeHandler = (e) => {
    setInputVal(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      if (inputVal !== TEST_CARD_NUMBER) {
        setSucceeded(false);
        setIsInvalidNumber(true);
        return;
      }
      setIsInvalidNumber(false);
      const formattedCart = cart.map(({ id, name, image, color, amount }) => ({
        id,
        name,
        image,
        color,
        amount,
      }));
      addOrder(formattedCart);
    }, 1000);
  };

  useEffect(() => {
    if (!error && !disabled) {
      setSucceeded(true);
      setInputVal("");
      setTimeout(() => {
        console.log(error);
        history.push("/");
        clearCartHandler();
      }, 3000);
    }
  }, [error]);

  return (
    <div className="payment">
      {succeeded && !error ? (
        <article>
          <h4>Thank you!</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly...</h4>
        </article>
      ) : (
        <div>
          <article>
            <h4>Hello, {nickname}</h4>
            <p>Your total is : {formatPrice(total)} </p>
            <p>Test Card Number : {TEST_CARD_NUMBER}</p>
          </article>

          <form id="payment-form" onSubmit={submitHandler}>
            <div id="card-element">
              <input
                type="text"
                value={inputVal}
                onChange={changeHandler}
                placeholder="Enter the above card number"
              />
            </div>
            <button id="submit" disabled={processing || disabled || succeeded}>
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinnier"></div>
                ) : (
                  "Pay"
                )}
              </span>
            </button>
            {isInvalidNumber && (
              <div className="card-error" role="alert">
                Your card number is invalid.
              </div>
            )}
          </form>
          {error && (
            <p className="error-msg">Something went wrong, please try again!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
