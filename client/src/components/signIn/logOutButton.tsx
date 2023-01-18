import { NavLink } from "react-router-dom";

export default function LogButtonOption () {

  function handleClick () {
    localStorage.removeItem('token')
  }
  const isLogged:any = localStorage.getItem("token");
  return (
      isLogged ?        
        <NavLink to={"/"}onClick={() => handleClick()}>
          Log Out
        </NavLink>
        : 
        <NavLink to={"/login"}/>
)};

