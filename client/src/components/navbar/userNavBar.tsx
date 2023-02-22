import { NavLink } from "react-router-dom";
import LogButtonOption from "./logButtonOption";

const UserNavBar = () => {
  return (
    <div className="nav__container">
      <div className="nav__buttons">
        <NavLink to="/" className="nav__btn">
          Jolie Bistro
        </NavLink>
      </div>

      <div className="nav__buttons">
        <NavLink to={"/contact-us"} className="nav__btn">
          Contact us
        </NavLink>
        <NavLink to={"/menu"} className="nav__btn">
          Menu
        </NavLink>
        <LogButtonOption />
      </div>
    </div>
  );
};

export default UserNavBar;
