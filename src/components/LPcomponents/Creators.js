import React from "react";

const Creators = () => {
  const creatorsInfoData = [
    {
      image: "..",
      title: "Arish",
      text: "Co-CEO",
    },
    {
      image: "..",
      title: "Claudio",
      text: "Co-CEO",
    },
    {
      image: "..",
      title: "Jacques",
      text: "Co-CEO",
    },
  ];

  return (
    <div className="creators-section-wrapper">
      <div className="creators-section-top">
        <p className="primary-subheading">Creators</p>
        <h1 className="primary-heading">The faces behind Collabify</h1>
        <p className="primary-text">
          We would like to give attributions to the ones that have made
          Collabify possible, 3 university students that decided to come together to
          improve producticity. The faces of the 3 people that were the begining
          of this wonderful app.
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
    </div>
  );
};

export default Creators;
