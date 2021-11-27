import React, { createRef, useRef } from "react";
import ComboBox from "../components/ComboBox";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import { ImWarning } from "react-icons/im";
import { numbersList } from "../files/data"; //top + 67px (movil) | top + 73px(tablet) | top + 78px(bigscreen)

const CareersForm = () => {
  const {
    careersList,
    careersPath,
    selectedNumSubjects,
    selectedCareer,
    setSelectedCareer,
    setSelectedNumSubjects,
    formErrMsg,
    showFormErrMsg,
  } = useGlobalContext();

  const history = useHistory();
  const careerRef = createRef();
  const classesRef = useRef();

  const handlerBegin = (e) => {
    e.preventDefault();

    console.log(
      `You´ve chosen the Career ${selectedCareer} with ${selectedNumSubjects} classes`
    );

    if (selectedCareer === "") {
      console.log(careerRef.current.getBoundingClientRect());
    } else if (selectedNumSubjects === 0) {
      console.log(classesRef.current.getBoundingClientRect());
    } else {
      history.push("/calc");
      setSelectedCareer("");
      setSelectedNumSubjects(0);
    }
  };

  return (
    <form className="main__form" onSubmit={(e) => handlerBegin(e)}>
      <div className={`main__form__error ${showFormErrMsg ? "active" : ""}`}>
        <ImWarning />
        <p>{formErrMsg || "Completa este campo"}</p>
      </div>
      <label className="main__form__label" ref={careerRef}>
        selecciona tu carrera:
      </label>
      <ComboBox
        items={careersList}
        nameValue={careersPath}
        holder="Selecciona una carrera"
      />
      <label className="main__form__label" ref={classesRef}>
        selecciona tu cantidad de materias:
      </label>
      <ComboBox
        items={numbersList}
        nameValue={numbersList}
        holder="Selecciona la cantidad"
      />
      <button type="submit" className="main__form__btn">
        comenzar
      </button>
    </form>
  );
};

export default CareersForm;
