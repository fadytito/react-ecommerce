import React from "react";
import Navbar from "../components/Navbar";
import Cartbtn from "./../components/cart/CartBtn";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Navbar />
      <Cartbtn />
    </div>
  );
};

export default Header;
