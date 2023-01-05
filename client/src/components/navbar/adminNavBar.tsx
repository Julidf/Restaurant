import { NavLink } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <div className="nav__container">
      <NavLink className="nav-btn" to={"/crear-producto"}>
        Add product
      </NavLink>
      <NavLink className="nav-btn" to={"/lista-de-usuarios"}>
        List of Users
      </NavLink>
      <NavLink className="nav-btn" to={"/lista-de-productos"}>
        List of Products
      </NavLink>
      <NavLink className="nav-btn" to={"/lista-de-Ordenes"}>
        List of Orders
      </NavLink>
    </div>
  );
};

export default AdminNavBar;
