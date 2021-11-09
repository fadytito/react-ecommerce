import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useCartContext } from "../context/cart-context";
import ProductDetailsModel from "../models/ProductDetailsModel";
import useFetch from "./../hooks/useFetch";

// const single_product_api = config.single_product_api;

const Productdetails = () => {
  const {
    data: product,
    fetchData: fetchProduct,
    isLoading,
    error,
  } = useFetch();
  const itemAmountValRef = useRef();
  const { addItemHandler } = useCartContext();
  const formattedProduct = new ProductDetailsModel(
    product.name,
    product.image,
    product.price
  );
  const { name, image, price } = formattedProduct;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProduct(null, { id });
    }
  }, [id, fetchProduct]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    addItemHandler(product, +itemAmountValRef.current.value);
  };

  return (
    <div>
      {name}
      <form onSubmit={addToCartHandler}>
        <input
          type="number"
          min="1"
          max="3"
          ref={itemAmountValRef}
          defaultValue="1"
        />
        <button>add to cart</button>
      </form>
    </div>
  );
};

export default Productdetails;
