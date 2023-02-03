import { NavLink } from "react-router-dom";
import LogButtonOption from "./logButtonOption";
import ProductDashboard from "../dashboard/productDashboard";

const UserNavBar = () => {
  return (
    <div className="nav__container">
      <div className="nav__buttons">
        <NavLink to="/" className="nav__btn">Jolie Bistro</NavLink>
      </div>

      <div className="nav__buttons">
        <NavLink to={"/contact-us"} className="nav__btn" >
          Contact us
        </NavLink>
        <NavLink to={"/menu"} className="nav__btn" >
          Menu
        </NavLink>
        <LogButtonOption />
        <NavLink to={"/products"} className="nav__btn" >
          Products
        </NavLink>
      </div>
    </div>
  );
};

export default UserNavBar;
