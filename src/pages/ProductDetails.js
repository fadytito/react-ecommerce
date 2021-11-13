import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import AddToCart from "../components/cart/AddToCart";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { ProductImages } from "../components/products";
import useFetch from "../hooks/useFetch";
import ProductDetailsModel from "../models/ProductDetailsModel";
import formatPrice from "../utils/format-price";

const Productdetails = () => {
  const {
    data: product,
    fetchData: fetchProduct,
    isLoading,
    error,
  } = useFetch();

  const { id } = useParams();
  const { goBack } = useHistory();

  useEffect(() => {
    fetchProduct({ id });
  }, [id, fetchProduct]);

  if (error) {
    return <Error />;
  }
  if (isLoading || !product) {
    return <Loading />;
  }

  const formattedProduct = new ProductDetailsModel(
    product.name,
    product.description,
    product.images,
    product.price,
    product.company
  );

  const { name, description, images, price, company } = formattedProduct;
  return (
    <div className="product-details">
      <div className="section section-center page">
        <button className="btn" onClick={goBack}>
          back to products
        </button>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <h5 className="price"> {formatPrice(price)}</h5>
            <p className="desc"> {description}</p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            <AddToCart product={product} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
