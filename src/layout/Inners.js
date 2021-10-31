import React from "react";
import Breadcrumb from "../components/Breadcrumb";

const Inners = ({ children }) => {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
};

export default Inners;
