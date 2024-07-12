import React, { useState, useContext } from "react";
import { TokenContext } from "../App.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [token] = useContext(TokenContext);
  return token ? children : <Navigate to="login" />;
};

export default PrivateRoute;
