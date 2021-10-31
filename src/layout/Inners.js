import React from "react";
import Breadcrumb from "./Breadcrumb";

const Inners = ({ children }) => {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
};

export default Inners;
