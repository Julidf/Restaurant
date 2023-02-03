import { NavLink } from "react-router-dom";
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
      <LogButtonOption />
    </div>
  );
};

export default AdminNavBar;
