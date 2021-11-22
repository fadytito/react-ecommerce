import React, { createRef, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useHistory, useParams } from "react-router";
import { Error, Loading } from "../components";
import AddToCart from "../components/cart/AddToCart";
import { ProductImages, ProductReviews } from "../components/products";
import Bookmark from "../components/products/Bookmark";
import { useProductContext } from "../context/product-context";
import useFetch from "../hooks/useFetch";
import { Breadcrumb } from "../layout";
import ProductDetailsModel from "../models/ProductDetailsModel";
import formatPrice from "../utils/format-price";

const Productdetails = () => {
  const { updatedProduct } = useProductContext();
  const {
    data: product,
    setData: setProduct,
    fetchData: fetchProduct,
    isLoading,
    error,
  } = useFetch();

  const { id } = useParams();
  const { goBack } = useHistory();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  useEffect(() => {
    if (!updatedProduct) return;
    setProduct(updatedProduct);
  }, [updatedProduct, setProduct]);

  if (error) {
    return <Error />;
  }
  if (isLoading || !product) {
    return <Loading />;
  }

  const formattedProduct = new ProductDetailsModel(product);

  const reviewsCount = product.reviews.length;

  const rating =
    reviewsCount > 0
      ? product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        reviewsCount
      : 0;

  const { name, description, images, price, company } = formattedProduct;

  const reviewsRef = createRef();

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
            <h2 className="product-header">
              {name} <Bookmark productId={product.id} />
            </h2>
            {reviewsCount > 0 && (
              <button
                className="rating"
                title={`${rating.toFixed(1)} out of 5`}
                onClick={() =>
                  reviewsRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                <Rating
                  readonly
                  initialRating={rating}
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar />}
                />
                <span className="rating-info">({reviewsCount}) ratings</span>
              </button>
            )}
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
        <ProductReviews product={product} ref={reviewsRef} />
      </div>
    </div>
  );
};

export default Productdetails;
