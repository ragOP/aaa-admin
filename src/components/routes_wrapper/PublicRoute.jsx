import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/home" replace /> : <>{children}</>;
};

export default PublicRoute;
