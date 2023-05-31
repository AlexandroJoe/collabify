import "./NavBar.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ welcomeText, handleLogout }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleUserIconClick = (event) => {
    event.stopPropagation();
    handleDropdownToggle();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">{welcomeText}</div>
      <div className="navbar-middle">Collabify</div>
      <div className="navbar-right">
        <div className="navbar-date">{currentDate}</div>
        <div className="navbar-user-icon" onClick={handleUserIconClick}>
          <FontAwesomeIcon icon={faUser} />
          {isDropdownOpen && (
            <div className="dropdown-menu" ref={dropdownRef}>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
