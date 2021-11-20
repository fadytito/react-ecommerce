import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { useHistory } from "react-router";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const {
    location: { pathname },
  } = useHistory();
  return (
    <button
      className="auth-btn"
      onClick={() => loginWithRedirect({ appState: { returnTo: pathname } })}
    >
      Login <FaUserPlus />
    </button>
  );
};

export default LoginButton;
