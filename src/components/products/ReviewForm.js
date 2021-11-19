import React, { useCallback, useEffect, useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useProductContext } from "../../context/product-context";
import { useUserContext } from "../../context/user-context";

const ReviewForm = ({ product, onCancel }) => {
  const reviewTextRef = useRef();
  const ratingRef = useRef();
  const { updateProduct, updatedProduct, isLoading, error, setProduct } =
    useProductContext();

  const {
    myUser: { name },
    orders,
  } = useUserContext();

  const onCancelRef = useRef();
  onCancelRef.current = onCancel;

  const submitHandler = (e) => {
    e.preventDefault();
    const { value: textValue } = reviewTextRef.current;
    const ratingValue = ratingRef.current;
    if (!ratingValue) return;
    updateProduct(
      product.id,
      {
        reviews: [
          {
            id: new Date().valueOf(),
            text: textValue,
            rating: ratingValue,
            date: new Date().toLocaleDateString(),
            username: name,
            verifiedPurchase: orders.some((o) =>
              o.items.some((item) => item.id === product.id)
            ),
          },
          ...product.reviews,
        ],
      },
      updateSuccessHandler
    );
    reviewTextRef.current.value = "";
  };

  const updateSuccessHandler = useCallback((product) => {
    setProduct(product);
    onCancelRef.current();
  }, []);

  useEffect(() => {}, [isLoading, updatedProduct]);

  return (
    <form onSubmit={submitHandler}>
      <div className="rating">
        <Rating
          onChange={(e) => (ratingRef.current = e)}
          readonly={isLoading}
          emptySymbol={<FaRegStar />}
          fullSymbol={<FaStar />}
        />
      </div>
      <div>
        <textarea
          type="textarea"
          rows="7"
          cols="70"
          ref={reviewTextRef}
          disabled={isLoading}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
        <button disabled={isLoading} className="btn">
          <div className={isLoading ? "hidden" : ""}>submit review</div>
          {isLoading && <div className="spinner" id="spinnier"></div>}
        </button>
        <button
          disabled={isLoading}
          className="cancel-btn"
          type="button"
          onClick={onCancelRef.current}
        >
          cancel
        </button>
      </div>
      {error && <p>something went wrong, please try again!</p>}
    </form>
  );
};

export default ReviewForm;
