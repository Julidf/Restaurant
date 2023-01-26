import { NavLink } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function LogButtonOption() {
  const {isLoggedIn, logOut} = useAuth();

  return isLoggedIn ? (
    <NavLink to={"/"} className="nav__btn" onClick={() => logOut()}>
      Log Out
    </NavLink>
  ) : (
    <NavLink to={"/login"} className="nav__btn">
      Log in
    </NavLink>
  );
}