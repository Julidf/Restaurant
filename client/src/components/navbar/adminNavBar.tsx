import { NavLink } from "react-router-dom";
import { UserProfile } from "../profile/userProfile";
import LogButtonOption from "./logButtonOption";

const AdminNavBar = () => {
  return (
    <div className="nav__container">
      <NavLink className="nav-btn" to={"/admin/users"}>
        List of Users
      </NavLink>
      <NavLink className="nav-btn" to={"/admin/products"}>
        List of Products
      </NavLink>
      <NavLink className="nav-btn" to={"/admin/orders"}>
        List of Orders
      </NavLink>
      <NavLink to={"/menu"} className="nav__btn" >
          Menu
      </NavLink>
      <NavLink to={"/"} className="nav__btn" >
          /Jolie
      </NavLink>
      <NavLink to={"/my-account"} className="nav__btn" >
          My account
      </NavLink>
      <LogButtonOption />
    </div>
  );
};

export default AdminNavBar;
