import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCartContext } from "../context/cart-context";
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

  const { clearCartHandler, total } = useCartContext();

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
      setSucceeded(true);
      setInputVal("");
      setTimeout(() => {
        clearCartHandler();
        history.push("/");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="payment">
      {succeeded ? (
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
        </div>
      )}
    </div>
  );
};

export default Payment;
