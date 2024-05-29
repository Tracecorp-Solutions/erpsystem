import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";

const FailureSlideInCard = ({ message, title, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 10000);

    return () => {
      clearTimeout(timeout);
      setIsVisible(false);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const cardStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "red",
    color: "white",
    padding: "20px",
    borderRadius: "24px",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    zIndex: "1000",
    transform: isVisible ? "translateX(0)" : "translateX(100%)",
    width: "20rem"
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    color: "white",
    padding: "10px",
    fontSize: "25px"
  };

  return (
    <div style={cardStyle}>
      <span style={closeButtonStyle} onClick={handleClose}>
        <CloseOutlined />
      </span>
      <h2 style={{
        textAlign: "center",
        fontSize: "36px",
        fontFamily: "outFit, Sans-serif",
        fontWeight: "600",
        marginTop: "20px"
      }}>
        {title}
      </h2>
      <div
        className="card-content"
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontFamily: "outFit, Sans-serif",
          fontWeight: "400",
          marginTop: "10px"
        }}
      >
        {message}
      </div>
    </div>
  );
};

FailureSlideInCard.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default FailureSlideInCard;