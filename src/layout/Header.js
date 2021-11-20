import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import AuthenticationButton from "../components/login/AuthenticationButton";
import Navbar from "../components/Navbar";
import Cartbtn from "./../components/cart/CartBtn";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidbar = () => {
    setIsSidebarOpen((s) => !s);
  };

  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="comfy sloth" />
          </Link>
          <div style={{ display: "flex" }}>
            <div
              className="header-btns-wrapper"
              style={{ marginRight: "2rem" }}
            >
              <Cartbtn />
            </div>
            <button type="button" className="nav-toggle" onClick={toggleSidbar}>
              <FaBars />
            </button>
          </div>
        </div>
        <Navbar />
        <div className="header-btns-wrapper">
          <Cartbtn />
          <AuthenticationButton />
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidbar={toggleSidbar} />
      </div>
    </header>
  );
};

export default Header;
