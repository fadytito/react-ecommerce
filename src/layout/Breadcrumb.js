import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ product, title }) => {
  return (
    <section className="breadcrumb">
      <div className="section-center">
        <h4>
          <Link to="/">Home</Link>
          {product && <Link to="/products">/ Products</Link>}/ {title}
        </h4>
      </div>
    </section>
  );
};

export default Breadcrumb;
