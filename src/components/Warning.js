//----------------------------Imports------------------------------
import React from "react";
import { ImWarning } from "react-icons/im";

//----------------------------Component----------------------------
const Warning = ({ showWarning, warningInfo }) => {
  //props destructuring
  const { top, left, message } = warningInfo;

  //----------------------------Rendering return-------------------
  return (
    <div
      className={`warning ${showWarning ? "active" : ""}`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <ImWarning />
      <p>{message || "completa este campo"}</p>
    </div>
  );
};

export default Warning;
