import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login-page" replace />;
};

export default PrivateRoute;
