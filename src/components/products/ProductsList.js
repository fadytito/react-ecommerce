import React from "react";
import ProductModel from "../../models/ProductModel";
import Productitem from "./ProductItem";

const Productslist = ({ products, isList }) => {
  const formattedProducts = products.map((item) => {
    const { id, name } = item;
    return new ProductModel(id, name);
  });
  return (
    <div style={{ display: isList ? "block" : "flex" }}>
      {formattedProducts.map((product) => (
        <Productitem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Productslist;
