import React from "react";
import ProductModel from "../../models/ProductModel";
import Productitem from "./ProductItem";

const Productslist = ({ products, isList }) => {
  const formattedProducts = products.map((item) => {
    const { id, name, description, image, price } = item;
    return new ProductModel(id, name, description, image, price);
  });
  return (
    <section className="products-list">
      <div
        className={`products-container ${isList ? "list-view" : "grid-view"}`}
      >
        {formattedProducts.map((product) => (
          <Productitem key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
};

export default Productslist;
