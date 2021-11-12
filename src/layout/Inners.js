import React from "react";
import Breadcrumb from "./Breadcrumb";

const Inners = ({ children }) => {
  return (
    <div className="page">
      <Breadcrumb />
      {children}
    </div>
  );
};

export default Inners;
