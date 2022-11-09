//----------------------------Imports----------------------------
import React, { createRef, useEffect, useReducer, useState } from "react";
import ComboBox from "./ComboBox";
import Warning from "./Warning";
import { useGlobalContext } from "../context";
import { getWarningInfo } from "../files/functions";
import { numbersList } from "../files/data";
import { reducer, defaultWarning } from "../reducer";

//----------------------------Component----------------------------
const CareersForm = () => {
  //----------------------------Hooks----------------------------
  const {
    dataCareers,
    selectedNumSubjects,
    selectedCareer,
    setSelectedCareer,
    setSelectedNumSubjects,
    setCareers,
    navigate,
  } = useGlobalContext();

  const [warning, warningDispatch] = useReducer(reducer, defaultWarning);
  const [showWarning, setShowWarning] = useState(false);
  const careerRef = createRef();
  const classesRef = createRef();

  useEffect(() => {
    const close = setTimeout(() => {
      setShowWarning(false);
    }, 2500);

    return () => {
      clearTimeout(close);
    };
  }, [showWarning]);

  useEffect(() => {
    const hide = setTimeout(() => {
      warningDispatch({ type: "RESET_WARNING_INFO" });
    }, 3500);

    return () => {
      clearTimeout(hide);
    };
  }, [warning]);

  //----------------------------Data----------------------------
  const careersList = dataCareers.map((item) => item.career);

  //----------------------------Functions----------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCareer === "") {
      setShowWarning(true);
      warningDispatch({
        type: "SET_WARNING_INFO",
        payload: getWarningInfo(careerRef, "selecciona una carrera"),
      });
    } else if (selectedNumSubjects === 0) {
      setShowWarning(true);
      warningDispatch({
        type: "SET_WARNING_INFO",
        payload: getWarningInfo(
          classesRef,
          "selecciona la cantidad de materias"
        ),
      });
    } else {
      const careerPath = dataCareers.filter(
        (item) => item.career === selectedCareer
      )[0].path;
      setCareers(careerPath);
      navigate("/calc");
    }
  };

  //----------------------------Rendering return----------------------------
  return (
    <form className="main__form" onSubmit={(e) => handleSubmit(e)}>
      <Warning showWarning={showWarning} warningInfo={warning} />
      <label className="main__form__label">selecciona tu carrera:</label>
      <ComboBox
        items={careersList}
        holder="Selecciona una carrera"
        cbRef={careerRef}
        setValue={setSelectedCareer}
      />
      <label className="main__form__label">
        selecciona tu cantidad de materias:
      </label>
      <ComboBox
        items={numbersList}
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
