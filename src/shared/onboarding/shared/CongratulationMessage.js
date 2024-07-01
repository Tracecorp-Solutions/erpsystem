import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CongratulationsCard = () => {

  const navigate = useNavigate();

  return (
    <div
      className="px-4 py-3 rounded relative"
      role="alert"
      style={{
        maxWidth: "80%",
        margin: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        background: "#fff",
        padding: "20px",
        borderRadius: "24px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
       <strong style={{
        fontSize: "36px",
        fontFamily: "outFit, Sans-serif"
       }}>Congratulations!</strong>
      <br />
      <span className="block sm:inline"
       style={{
        fontSize: "16px",
        fontWeight: "400",
        color: "#505050",
        fontFamily: "outFit, Sans-serif",
        marginTop: "15px"
       }}
      >
        You've successfully set up your company on TraceAccounting and invited your team members! 
      </span>
      <br />
      <div style={{
        marginTop: "15px"
      }}>
      <Link type="button" style={{
        background: "#4467a1",
        padding: "10px 20px",
        borderRadius: "28px",
        color: "#fff",
        fontFamily: "outFit, Sans-serif",
        cursor: "pointer"
      }}
      to="/landing"
      >Go to Dashboard</Link></div>
      </div>
    </div>
  );
};

export default CongratulationsCard;
