import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faStickyNote,
  faCommentAlt,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import NavBar from "./NavBar";

const Dashboard = ({ handleLogout }) => {
  return (
    <div className="dashboard">
      <NavBar welcomeText={"Welcome back!"} handleLogout={handleLogout} />
      <div className="dashboard-buttons">
        <Link to="/todo" className="dashboard-button-link dashboard-button">
          <FontAwesomeIcon icon={faEdit} className="dashboard-icon" />
          <span className="dashboard-button-text">Todo</span>
        </Link>
        <Link to="/notes" className="dashboard-button-link dashboard-button">
          <FontAwesomeIcon icon={faStickyNote} className="dashboard-icon" />
          <span className="dashboard-button-text">Notes</span>
        </Link>
        <Link to="/chat" className="dashboard-button-link dashboard-button">
          <FontAwesomeIcon icon={faCommentAlt} className="dashboard-icon" />
          <span className="dashboard-button-text">Chat with AI</span>
        </Link>
        <Link to="/mind-map" className="dashboard-button-link dashboard-button">
          <FontAwesomeIcon icon={faProjectDiagram} className="dashboard-icon" />
          <span className="dashboard-button-text">Mind Map</span>
        </Link>
        {/* Add more buttons with respective routes */}
      </div>
    </div>
  );
};

export default Dashboard;
