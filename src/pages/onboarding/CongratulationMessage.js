import React from "react";

const CongratulationsCard = () => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
      style={{
        width: "50%",
        margin: "auto", // Center horizontally
        position: "fixed", // Position in the middle of the screen
        top: "50%", // Move to the vertical center
        left: "50%", // Move to the horizontal center
        transform: "translate(-50%, -50%)" // Centering trick
      }}
    >
      <strong className="font-bold">Congratulations!</strong>
      <br />
      <span className="block sm:inline">
        You have successfully completed all steps.
      </span>
    </div>
  );
};

export default CongratulationsCard;
