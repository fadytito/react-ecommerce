import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FaUserMinus } from "react-icons/fa";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="auth-btn"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Logout <FaUserMinus />
    </button>
  );
};

export default LogoutButton;
