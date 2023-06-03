import React from "react";
import todo from "./todo.png";
import notepad from "./notepad.png";
import robot from "./Robot.png";
import mindmap from "./mind-map.png";
import todo2 from "./todo2.png";
import notepad2 from "./notepad2.png";

const Features = () => {
  const featuresInfoData = [
    {
      image: todo,
      title: "To-do List",
      text: "A draggable to-do list with different columns for your new, in-progress and completed tasks. Editable and removable at anywtime.",
      image2: todo2,
    },
    {
      image: notepad,
      title: "Notepad",
      text: "You very own notepad to keep all your thoughts availablon the same screen. Additionally the last modified date and multiple styling types are available.",
      image2: notepad2,
    },
    {
      image: robot,
      title: "Chat with AI",
      text: "Having any questions that you don't remember the answer to? Maybe our chatBot can help you.",
      image2: "",
    },
    {
      image: mindmap,
      title: "Mind Map",
      text: "One of the most important aspects of the idealization process is the visuation of how each idea lead to another, our mind mapping tool is here to help you with it.",
      image2: "",
    },
  ];

  return (
    <div className="features-section-wrapper">
      <div className="features-section-top">
        <p className="primary-subheading">Features</p>
        <h1 className="primary-heading">What We Have to Offer</h1>
        <p className="primary-text">
          Step into the world of Collabify, where innovation meets efficiency
          and productivity knows no bounds. In this section, we invite you to
          discover the remarkable features that make Collabify a game-changer in
          the realm of productivity tools.
        </p>
      </div>
      <div className="features-section-bottom">
        {featuresInfoData.map((data, index) => (
          <div className="features-section-info" key={index}>
            <div className="card">
              <div className="card-front">
                <div className="info-boxes-img-container">
                  <img src={data.image} alt="" />
                </div>
                <h2>{data.title}</h2>
                <p>{data.text}</p>
              </div>
              <div className="card-back">
                <div className="info-boxes-img-container">
                  <img src={data.image2} alt="" />
                </div>
                <h2>{data.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
