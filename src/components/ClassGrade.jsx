//----------------------------Imports-----------------------------
import React from "react";
import Spinner from "./Spinner";
import ComboBox from "./ComboBox";

//----------------------------Component----------------------------
const ClassGrade = ({ comboData, comboRef, spinnerRef }) => {
  //----------------------------Data----------------------
  const classesList = comboData.map((item) => item.ASIGNATURA);

  //----------------------------Rendering return-------------------
  return (
    <article className="calc__form__article">
      <h4 className="calc__form__article__title">
        selecciona la materia y la calificación:
      </h4>
      <div className="calc__form__article__container">
        <ComboBox
          items={classesList}
          holder="Selecciona la materia"
          cbRef={comboRef}
        />
        <Spinner spRef={spinnerRef} />
      </div>
    </article>
  );
};

export default ClassGrade;
