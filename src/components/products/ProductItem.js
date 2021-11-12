import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import formatPrice from "../../utils/format-price";

const Productitem = ({ item }) => {
  const { id, name, description, image, price } = item;
  return (
    <article className="product-item">
      <div className="container">
        <img src={image} alt={name} />
        <Link to={`/products/${id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
      <div className="details">
        <h4>{name}</h4>
        <h5 className="price">{formatPrice(price)}</h5>
        <p>{description.substring(0, 150)}...</p>
        <Link to={`/products/${id}`} className="btn">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Productitem;
