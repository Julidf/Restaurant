import { isValidElement } from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../signIn/LoginForm";
import LogButtonOption from "../signIn/logButtonOption";
import UserRegistration from "../userRegistration/userRegistration";

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
        <NavLink className="nav__btn" to={"/menu"}>
          Menu
        </NavLink>
        <LogButtonOption/>
        
        
      </div>
    </div>
  );
};

export default UserNavBar;
