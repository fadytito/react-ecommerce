import React, { useState } from "react";
import { useUserContext } from "../../context/user-context";
import ReviewForm from "./ReviewForm";

const ProductReviews = React.forwardRef(({ product }, ref) => {
  const [isReviewForm, setIsReviewForm] = useState(false);
  const { myUser } = useUserContext();
  return (
    <section ref={ref} className="reviews">
      <h3>Reviews</h3>
      {myUser && (
        <div className="review-form">
          {!isReviewForm && (
            <button className="btn" onClick={() => setIsReviewForm(true)}>
              add review
            </button>
          )}
          {isReviewForm && (
            <ReviewForm
              product={product}
              onCancel={() => setIsReviewForm(false)}
            />
          )}
        </div>
      )}

      <div>
        {product.reviews.length > 0 ? (
          product.reviews.map(
            (r) =>
              r.text.length > 0 && (
                <div key={r.id} className="review-item">
                  <div className="review-user-info">
                    {r.username}
                    {r.verifiedPurchase && <span>verified purchase</span>}
                  </div>
                  <div className="date">{r.date}</div>
                  <p className="text">{r.text} </p>
                </div>
              )
          )
        ) : (
          <p>There is no reviews for this product yet!</p>
        )}
      </div>
    </section>
  );
});

export default ProductReviews;
