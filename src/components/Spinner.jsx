//----------------------------Imports---------------------------
import React, { useState } from "react";
import { grades } from "../files/data";

//----------------------------Component-------------------------
const Spinner = ({ spRef }) => {
  //----------------------------Hook----------------------------
  const [gradesIdx, setGradesIdx] = useState(0);

  //----------------------------Functions-----------------------
  const next = () => {
    gradesIdx === grades.length - 1
      ? setGradesIdx(0)
      : setGradesIdx(gradesIdx + 1);
  };

  const prev = () => {
    gradesIdx === 0
      ? setGradesIdx(grades.length - 1)
      : setGradesIdx(gradesIdx - 1);
  };

  //----------------------------Rendering return----------------
  return (
    <div className="spinner">
      <span className="spinner__next" onClick={next}></span>
      <span className="spinner__prev" onClick={prev}></span>
      <div className="spinner__box">
        <span className="spinner__box__content" ref={spRef}>
          {grades[gradesIdx]}
        </span>
      </div>
    </div>
  );
};

export default Spinner;
