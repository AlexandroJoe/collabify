import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import about from "./About.png";

const About = () => {
  return (
    <div className="about-section-container" id="#About">
      <div className="about-section-image-container">
        <img src={about} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">What is Collabify?</h1>
        <p className="primary-text">
          Collabify is not just another app; it's a game-changer that brings
          together a todo list, a notepad, a chatbot, and a mind map maker into
          a seamless and intuitive interface. With Collabify, you'll experience
          a whole new level of efficiency that will revolutionize the way you
          work. <br /> <br /> Picture this: effortlessly create and manage your
          to-do lists, set deadlines, and prioritize tasks with ease. Take
          notes, capture brilliant ideas, and never miss a beat. Need instant
          answers or assistance? Our built-in chatbot is at your service, ready
          to provide helpful information and guidance whenever you need it. And
          when it's time to visualize your thoughts, our mind map maker lets you
          brainstorm, organize concepts, and unlock your creative potential. <br /> <br /> Learn more about Collabify down below!
        </p>
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
