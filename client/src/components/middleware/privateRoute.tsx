import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthCheck from "./authCheck";

interface requiredRole {
  requiredRole: string;
}

const PrivateRoute = ({ requiredRole }: requiredRole) => {
  const location = useLocation();

  return AuthCheck(requiredRole) ? 
    <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />

};

export default PrivateRoute;
