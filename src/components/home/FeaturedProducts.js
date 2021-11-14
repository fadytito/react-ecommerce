import React from "react";
import { Link } from "react-router-dom";
import { useProductsContext } from "../../context/products-context";
import Error from "../Error";
import Loading from "../Loading";
import Productitem from "../products/ProductItem";

const Featuredproducts = () => {
  const { allProductsArr, isLoading, error } = useProductsContext();
  const featuredProducts = allProductsArr.filter((product) => product.featured);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <section className="featured-products section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featuredProducts.slice(0, 3).map((product) => {
          return <Productitem key={product.id} item={product} />;
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </section>
  );
};

export default Featuredproducts;
