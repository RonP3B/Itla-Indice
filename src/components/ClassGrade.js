//----------------------------Imports-----------------------------
import React, { useState } from "react";
import Spinner from "./Spinner";
import ComboBox from "./ComboBox";

//----------------------------Component----------------------------
const ClassGrade = ({ comboData, comboRef, spinnerRef }) => {
  //----------------------------Hook and data----------------------
  const [subject, setSubject] = useState("");
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
          itemsValue={classesList}
          holder="Selecciona la materia"
          cbRef={comboRef}
          setValue={setSubject}
        />
        <Spinner spRef={spinnerRef} />
      </div>
    </article>
  );
};

export default ClassGrade;
