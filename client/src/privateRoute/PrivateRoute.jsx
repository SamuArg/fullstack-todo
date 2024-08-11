import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
// Provides access to pages that require authentication or redirects to the login page
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
};

export default PrivateRoute;
