import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <section className="breadcrumb">
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
        </h3>
      </div>
    </section>
  );
};

export default Breadcrumb;
