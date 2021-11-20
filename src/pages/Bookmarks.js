import React from "react";
import { Link } from "react-router-dom";
import { Error, Loading } from "../components";
import { useProductsContext } from "../context/products-context";
import { useUserContext } from "../context/user-context";
import { Breadcrumb } from "../layout";
import Productslist from "./../components/products/ProductsList";

const Bookmarks = () => {
  const { myUser, bookmarks, error, isLoading } = useUserContext();
  const {
    products: { allProducts },
  } = useProductsContext();

  if (error) {
    return <Error />;
  }
  if (!myUser || isLoading) {
    return <Loading />;
  }

  if (bookmarks.length === 0) {
    return (
      <React.Fragment>
        <Breadcrumb title="Bookmarks" />
        <div className="bookmarks-page page-100">
          <div className="empty">
            <h2>You haven't bookmarked any item yet!</h2>
            <Link to="/products" className="btn">
              add your first bookmark
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const bookmarkedItems = bookmarks.map((b) => allProducts[b]);

  return (
    <div className="bookmarks-page">
      <Breadcrumb title="Bookmarks" />
      <section className="section section-center">
        <Productslist products={bookmarkedItems} isList />
      </section>
    </div>
  );
};

export default Bookmarks;
