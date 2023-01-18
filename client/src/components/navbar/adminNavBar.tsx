import { NavLink } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <div className="nav__container">
      <NavLink className="nav-btn" to={"/admin/create-product"}>
        Add product
      </NavLink>
      <NavLink className="nav-btn" to={"/admin/list-of-users"}>
        List of Users
      </NavLink>
      <NavLink className="nav-btn" to={"/admin/list-of-products"}>
        List of Products
      </NavLink>
      <NavLink className="nav-btn" to={"/admin/list-of-orders"}>
        List of Orders
      </NavLink>
    </div>
  );
};

export default AdminNavBar;
