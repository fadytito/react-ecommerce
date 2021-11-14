import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FaUserPlus } from "react-icons/fa";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className="auth-btn" onClick={() => loginWithRedirect()}>
      Login <FaUserPlus />
    </button>
  );
};

export default LoginButton;
