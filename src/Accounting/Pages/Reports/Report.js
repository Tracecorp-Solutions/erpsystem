import React, { useState } from "react";
import Cards from "./Card";
import Statement from "./Statement";

const Report = () => {
  const [showStatement, setShowStatement] = useState(false);

  const handleAccountStatementClick = () => {
    setShowStatement(true);
  };

  return (
    <div>
      <Cards onAccountStatementClick={handleAccountStatementClick} />
      {showStatement && <Statement />}
    </div>
  );
};

export default Report;
