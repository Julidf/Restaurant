import jwtDecode from "jwt-decode";

const AuthCheck: Function = (requiredRole: string): boolean => {
  const token: string | null = localStorage.getItem("token");

  if (token === null) return false;
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.role !== requiredRole) return false;
  return true;
};

export default AuthCheck;