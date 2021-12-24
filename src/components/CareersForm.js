//----------------------------Imports----------------------------
import React, { createRef } from "react";
import ComboBox from "./ComboBox";
import Warning from "./Warning";
import { useGlobalContext } from "../context";
import { getWarningInfo } from "../files/functions";
import { numbersList } from "../files/data";

//----------------------------Component----------------------------
const CareersForm = () => {
  //----------------------------Hooks----------------------------
  const {
    dataCareers,
    selectedNumSubjects,
    selectedCareer,
    setSelectedCareer,
    setSelectedNumSubjects,
    showWarningMain,
    warningMain,
    showWarning,
    setCareers,
    history,
  } = useGlobalContext();

  const careerRef = createRef();
  const classesRef = createRef();

  //----------------------------Data----------------------------
  const careersList = dataCareers.map((item) => item.career);
  const careersPath = dataCareers.map((path) => path.path);

  //----------------------------Functions----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCareer === "") {
      showWarning(getWarningInfo(careerRef, "selecciona una carrera"), 0);
    } else if (selectedNumSubjects === 0) {
      showWarning(
        getWarningInfo(classesRef, "selecciona la cantidad de materias"),
        0
      );
    } else {
      setCareers(selectedCareer);
      history.push("/calc");
    }
  };

  //----------------------------Rendering return----------------------------
  return (
    <form className="main__form" onSubmit={(e) => handleSubmit(e)}>
      <Warning showWarning={showWarningMain} warningInfo={warningMain} />
      <label className="main__form__label">selecciona tu carrera:</label>
      <ComboBox
        items={careersList}
        itemsValue={careersPath}
        holder="Selecciona una carrera"
        cbRef={careerRef}
        setValue={setSelectedCareer}
      />
      <label className="main__form__label">
        selecciona tu cantidad de materias:
      </label>
      <ComboBox
        items={numbersList}
        itemsValue={numbersList}
        holder="Selecciona la cantidad"
        cbRef={classesRef}
        setValue={setSelectedNumSubjects}
      />
      <button type="submit" className="main__form__btn">
        comenzar
      </button>
    </form>
  );
};

export default CareersForm;
