import React from "react";
import HomeNavBar from "./HomeNavBar";
import { FiArrowRight } from "react-icons/fi";
import HomeBG from "./Productivity.jpg"

const Home = () => {
  return (
    <div className="home-container">
      <HomeNavBar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            All the features you need to be your most productive self
          </h1>
          <p className="primary-text">
            Tired of having to open different apps everytime you have
            to work? Well Collabify is here for you.
          </p>
          <button className="secondary-button">
            Get Started Now <FiArrowRight/>
          </button>
        </div>
        <div className="home-image-section">
            <img src={HomeBG} alt=""></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
