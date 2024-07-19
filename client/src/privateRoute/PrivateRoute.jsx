import { Navigate } from "react-router-dom";
// Donne accès aux pages ou il faut être connecter ou redirige vers la page de connexion
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="login" />;
};

export default PrivateRoute;
