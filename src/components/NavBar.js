import "./NavBar.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  // Get today's date
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="navbar">
      <div className="navbar-left">Welcome back</div>
      <div className="navbar-middle">Collabify</div>
      <div className="navbar-right">
        <div className="navbar-date">{currentDate}</div>
        <div className="navbar-user-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
