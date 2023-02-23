import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHandler from "../navbar/navbarHandler";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <NavbarHandler />
      <div className="landing__container">
        <h2 className="landing__title"></h2>
        <img
          className="landing__image"
          src="../loguito.jpg"
          alt="landing"
        />
        <div className="landing__btn__container">
          <button className="btn" id="landing__btn" onClick={() => navigate("/menu")}>
            Our menu
          </button>
        </div>
      </div>
    </Fragment>
  );
}
