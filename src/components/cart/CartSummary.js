import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart-context";
import formatPrice from "../../utils/format-price";

const CartSummary = () => {
  const { subtotal, shipmentFee, total } = useCartContext();
  const {
    location: { pathname },
  } = useHistory();
  const { user, loginWithRedirect } = useAuth0();

  return (
    <section className="cart-summary">
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(subtotal)}</span>
          </h5>
          <p>
            shipping fee :
            <span>{shipmentFee > 0 ? formatPrice(shipmentFee) : "$" + 0}</span>
          </p>
          <hr />
          <h4>
            order total : <span>{formatPrice(total)}</span>
          </h4>
        </article>

        {user ? (
          <Link to="/checkout" className="btn">
            proceed to checkout
          </Link>
        ) : (
          <button
            className="btn"
            onClick={() =>
              loginWithRedirect({ appState: { returnTo: pathname } })
            }
          >
            proceed to checkout
          </button>
        )}
      </div>
    </section>
  );
};

export default CartSummary;
