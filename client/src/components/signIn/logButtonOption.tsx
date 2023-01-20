import { NavLink } from "react-router-dom";

export default function LogButtonOption() {
  function handleClick() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  const isLogged: String | null = localStorage.getItem("token");

  return isLogged ? (
    <NavLink to={"/"} className="nav__btn" onClick={() => handleClick()}>
      Log Out
    </NavLink>
  ) : (
    <NavLink to={"/login"} className="nav__btn">
      Log in
    </NavLink>
  );
}
