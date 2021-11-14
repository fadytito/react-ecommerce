import React from "react";
import { FaTimes } from "react-icons/fa";
import logo from "../assets/logo.svg";
import AuthenticationButton from "../components/login/AuthenticationButton";
import Navbar from "../components/Navbar";
import Cartbtn from "./../components/cart/CartBtn";

const Sidebar = ({ isSidebarOpen, toggleSidbar }) => {
  return (
    <div className="sidebar-wrapper">
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img src={logo} className="logo" alt="comfy sloth" />
          <button className="close-btn" type="button" onClick={toggleSidbar}>
            <FaTimes />
          </button>
        </div>
        <Navbar />
        <div className="header-btns-wrapper">
          <Cartbtn />
          <AuthenticationButton />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
