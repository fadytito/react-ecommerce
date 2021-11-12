import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { SHIPPING_FEE } from "../../constants/cart-constants";
import { useCartContext } from "../../context/cart-context";
import formatPrice from "../../utils/format-price";

const CartSummary = () => {
  const { cart } = useCartContext();

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.amount * item.price, 0),
    [cart]
  );
  const hasShipmentFee = cart.some((item) => !item.shipping);
  return (
    <section className="cart-summary">
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(subtotal)}</span>
          </h5>
          {hasShipmentFee && (
            <p>
              shipping fee : <span>{formatPrice(SHIPPING_FEE)}</span>
            </p>
          )}
          <hr />
          <h4>
            order total : <span>{formatPrice(subtotal + SHIPPING_FEE)}</span>
          </h4>
        </article>
        <Link to="/checkout" className="btn">
          proceed to checkout
        </Link>
        {/* {myUser ? (
        ) : (
          <button type="button" className="btn">
            login
          </button>
        )} */}
      </div>
    </section>
  );
};

export default CartSummary;
