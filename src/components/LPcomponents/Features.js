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
    },
    {
      image: notepad,
      title: "Notepad",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: robot,
      title: "Chat with AI",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
        image: mindmap,
        title: "Mind Map",
        text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
      },
  ];

  // same disposition as the creators section apart from the info section
  return <div className="features-section-wrapper">
    <div className="features-section-top">
        <p className="primary-subheading">Features</p>
        <h1 className="primary-heading">What we have to offer</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="features-section-bottom">
        {featuresInfoData.map((data) => (
          <div className="features-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
  </div>;
};

export default Features;
