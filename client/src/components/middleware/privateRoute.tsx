import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAutho from "../hooks/useAutho";

interface requiredRole {
  requiredRole: string;
}

export default function PrivateRoute ({ requiredRole }: requiredRole) {
  const { auth }: any = useAutho();
  const location = useLocation();

  //console.log(auth.user)
  //console.log(auth.role)


  return (
    auth?.role === requiredRole
        ? <Outlet />
        : auth?.user
            ? <Navigate to="/" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
);
    // 'ADMIN2' === requiredRole
    // ? <Outlet />
    // : "asde" != null
    //     ? <Navigate to="/admin/create-product" state={{ from: location }} replace />
    //     : <Navigate to="/login" state={{ from: location }} replace />

}