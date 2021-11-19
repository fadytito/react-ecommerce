import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found-page page-100">
      <h1>404</h1>
      <h3>Sorry, this page is not found!</h3>
      <Link to="/" className="btn">
        back home
      </Link>
    </section>
  );
};

export default NotFound;
