import React from "react";
import todo from "./todo.png";
import notepad from "./notepad.png";
import robot from "./Robot.png";
import mindmap from "./mind-map.png";

const Features = () => {
  const featuresInfoData = [
    {
      image: todo,
      title: "To-do List",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
      image2: ""
    },
    {
      image: notepad,
      title: "Notepad",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
      image2: ""
    },
    {
      image: robot,
      title: "Chat with AI",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
      image2: ""
    },
    {
      image: mindmap,
      title: "Mind Map",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
      image2: ""
    },
  ];

  return (
    <div className="features-section-wrapper">
      <div className="features-section-top">
        <p className="primary-subheading">Features</p>
        <h1 className="primary-heading">What We Have to Offer</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
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
