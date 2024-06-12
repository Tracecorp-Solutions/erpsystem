import React from "react";
import "../../Styles/GroupCreation.css"

const EmptyData = ({ title, message }) => {
  return (
    <div className="container">
      <div className="group-creation-image">
        <img src="/images/empty.jpg" width={100} height={100} alt="Empty" />
      </div>
      <h4 className="group-creation-title">{title}</h4>
      <p className="group-creation-description">{message}</p>
    </div>
  );
};

export default EmptyData;
