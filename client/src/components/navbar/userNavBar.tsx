import { NavLink } from "react-router-dom";

const UserNavBar = () => {
  return (
    <div className="nav__container">
      <div className="nav__buttons">
        <NavLink to="/">Jolie Bistro</NavLink>
      </div>
      <div className="nav__buttons">
        <NavLink className="nav__btn" to={"/contact-us"}>
          Contact us
        </NavLink>
        <NavLink className="nav__btn" to={"/home"}>
          Products
        </NavLink>
        <NavLink className="nav__btn" to={"/favourites"}>
          Favourites
        </NavLink>
        <NavLink className="nav__btn" to={"/"}>
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default UserNavBar;
