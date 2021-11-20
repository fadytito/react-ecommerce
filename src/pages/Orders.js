import React from "react";
import { Link } from "react-router-dom";
import { Error, Loading } from "../components";
import { useUserContext } from "../context/user-context";
import { Breadcrumb } from "../layout";

const Orders = () => {
  const { myUser, orders, error, isLoading } = useUserContext();

  if (error) {
    return <Error />;
  }
  if (!myUser || isLoading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <React.Fragment>
        <Breadcrumb title="Orders" />
        <div className="orders-page page-100">
          <div className="empty">
            <h2>You have no orders!</h2>
            <Link to="/products" className="btn">
              make your first order
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="orders-page">
      <Breadcrumb title="Orders" />
      <section className="section section-center">
        {orders.map((order) => (
          <div key={order.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "3rem",
              }}
            >
              <h4>Order No : {order.id}</h4>
              <p>{order.date}</p>
            </div>
            <div>
              {order.items.map(({ id, image, name, color, amount }) => (
                <div key={id + color}>
                  <article className="cart-item">
                    <Link to={`/products/${id}`}>
                      <div className="title">
                        <img src={image} alt={name} />
                        <div>
                          <h5 className="name">{name}</h5>
                          <p className="color">
                            color : <span style={{ background: color }}></span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <h5 className="amount">
                      <span>amount : </span>
                      {amount}
                    </h5>
                  </article>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Orders;
