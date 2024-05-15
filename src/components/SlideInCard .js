import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";

const SlideInCard = ({ message, onClose, title }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const cardStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#9EC137",
    color: "white",
    padding: "20px",
    borderRadius: "24px",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    zIndex: "1000",
    transform: isVisible ? "translateX(0%)" : "translateX(100%)",
    width: "450px"
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    color: "white",
    padding: "10px",
    fontSize: "25px",
    color: "#505050"
  };

  return (
    <div style={cardStyle}>
        <span style={closeButtonStyle} onClick={handleClose}>
        <CloseOutlined />
      </span>
        <h2 style={{
            textAlign: "center",
            fontSize: "36px",
            color: "#505050",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
            marginTop: "20px"
            }}
        >
         {title}
        </h2>
      <div
       className="card-content"
       style={{
        textAlign: "center",
        fontSize: "16px",
        color: "#505050",
        fontFamily: "outFit, Sans-serif",
        fontWeight: "400",
        marginTop: "10px"
       }}
       >{message}</div>
    </div>
  );
};

SlideInCard.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default SlideInCard;
