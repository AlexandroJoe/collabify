import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import about from "./About.png"

const About = () => {
  return (
    <div className="about-section-container" id="#About">
      <div className="about-section-image-container">
        <img src={about} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">What is Collabify?</h1>
        <p className="primary-text">.....</p>
        <div className="about-button-container">
          <a href="https://youtu.be/dQw4w9WgXcQ">
            <button className="watch-video-button">
              <BsFillPlayCircleFill />
              Watch our video
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
