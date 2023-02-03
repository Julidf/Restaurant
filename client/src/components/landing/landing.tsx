import { useNavigate } from "react-router-dom";
import NavbarHandler from "../navbar/navbarHandler";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <NavbarHandler />
      </div>
      <div className="landing__container">
        <h2 className="landing__title">Welcome</h2>
        <img
          className="landing__image"
          src="http://restaurantjolie.com/img/logo.gif"
          alt="landing"
        />
        <div className="landing__btn__container">
          <button className="btn" id="landing__btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="btn" id="landing__btn" onClick={() => navigate("/menu")}>
            Our menu
          </button>
        </div>
      </div>
    </>
  );
}
