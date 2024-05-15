import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";

const FailureSlideInCard = ({ message, title, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const cardStyle = {
    position: "fixed",
    bottom: "20px",
    right: isVisible ? "20px" : "-450px",
    padding: "20px",
    borderRadius: "24px",
    transition: "transform 0.3s ease-in-out, right 0.3s ease-in-out",
    cursor: "pointer",
    zIndex: "1000",
    width: "450px",
    transform: isVisible ? "translateX(0%)" : "translateX(100%)",
    backgroundColor: "#FF6347",
    color: "white",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    color: "white",
    padding: "10px"
  };

  return (
    <div style={cardStyle}>
      <h2 style={{
        textAlign: "center",
        fontSize: "36px",
        fontFamily: "outFit, Sans-serif",
        fontWeight: "600"
        }}
      >
        {title}
      </h2>
      <div className="card-content" style={{
        textAlign: "center",
        fontSize: "16px",
        fontFamily: "outFit, Sans-serif",
        fontWeight: "400"
        }}>
         {message}
        </div>
      <span style={closeButtonStyle} onClick={() => setIsVisible(false)}>
        <CloseOutlined />
      </span>
    </div>
  );
};

FailureSlideInCard.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default FailureSlideInCard;