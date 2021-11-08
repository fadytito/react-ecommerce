import React from "react";

const Inners = ({ children }) => {
  return (
    <div className="page">
      {/* <Breadcrumb /> */}
      {children}
    </div>
  );
};

export default Inners;
