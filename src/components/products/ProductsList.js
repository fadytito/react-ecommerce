import React from "react";
import ProductModel from "../../models/ProductModel";
import Productitem from "./ProductItem";

const Productslist = ({ products }) => {
  const formattedProducts = products.map((item) => {
    const { id, name } = item;
    return new ProductModel(id, name);
  });
  return (
    <div>
      {formattedProducts.map((product) => (
        <Productitem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Productslist;
