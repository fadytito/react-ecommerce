import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/user-context";

const Navbar = () => {
  const { myUser } = useUserContext();
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        {myUser && (
          <li>
            <NavLink to="/bookmarks">Bookmarks</NavLink>
          </li>
        )}
        {myUser && (
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
