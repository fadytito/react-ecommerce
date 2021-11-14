import React from "react";
import { useHistory, useParams } from "react-router";
import { Error, Loading } from "../components";
import AddToCart from "../components/cart/AddToCart";
import { ProductImages } from "../components/products";
import { useProductsContext } from "../context/products-context";
import { Breadcrumb } from "../layout";
import ProductDetailsModel from "../models/ProductDetailsModel";
import formatPrice from "../utils/format-price";

const Productdetails = () => {
  const {
    products: { allProducts },
    isLoading,
    error,
  } = useProductsContext();

  const { id } = useParams();
  const { goBack } = useHistory();

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <Loading />;
  }

  const product = allProducts[id];

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
      <Breadcrumb product={id} title={product.name} />
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
