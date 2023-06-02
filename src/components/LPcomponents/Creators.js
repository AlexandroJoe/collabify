import React from "react";

const Creators = () => {
  const creatorsInfoData = [
    {
      image: "..",
      title: "Arish",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: "..",
      title: "Claudio",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: "..",
      title: "Jacques",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];

  return <div className="creators-section-wrapper">
    <div className="creators-section-top">
        <p className="primary-subheading">Creators</p>
        <h1 className="primary-heading">The faces behind Collabify</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="creators-section-bottom">
        {creatorsInfoData.map((data) => (
          <div className="creators-section-info" key={data.title}>
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

export default Creators;
