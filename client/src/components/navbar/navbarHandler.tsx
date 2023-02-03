import AuthCheck from "../middleware/authCheck";
import AdminNavBar from "./adminNavBar";
import UserNavBar from "./userNavBar";

function NavbarHandler() {
  return AuthCheck("ADMIN") ? <AdminNavBar /> : <UserNavBar />;
}

export default NavbarHandler;
