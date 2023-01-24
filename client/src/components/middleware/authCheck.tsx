import jwtDecode from "jwt-decode";

const AuthCheck = (requiredRole: string) => {
  const token: any = localStorage.getItem("token");
  
  if (token == null) return false;
  
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.role !== requiredRole) return false;
  else return true;
};

export default AuthCheck;
