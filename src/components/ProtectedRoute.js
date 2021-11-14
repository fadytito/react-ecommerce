import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ children, ...args }) => {
  const { user } = useAuth0();
  return user ? <Route {...args}>{children}</Route> : <Redirect to="/" />;
};

export default ProtectedRoute;
