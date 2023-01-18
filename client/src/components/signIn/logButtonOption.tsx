import { NavLink } from "react-router-dom";

export default function LogButtonOption () {

  function handleClick () {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const isLogged:any = localStorage.getItem("token");



  return (
      isLogged ?        
        <NavLink to={"/"}onClick={() => handleClick()}>
          Log Out
        </NavLink>
        : 
        <NavLink to={"/login"}>
          Log in
        </NavLink>
)}

