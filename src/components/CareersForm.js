import React, { createRef } from "react";
import { useHistory } from "react-router-dom";
import ComboBox from "../components/ComboBox";
import { useGlobalContext } from "../context";
import { ImWarning } from "react-icons/im";
import { getWarningInfo } from "../files/functions";
import { numbersList } from "../files/data";

const CareersForm = () => {
  const history = useHistory();
  const careerRef = createRef();
  const classesRef = createRef();
  const {
    careersList,
    careersPath,
    selectedNumSubjects,
    selectedCareer,
    setSelectedCareer,
    setSelectedNumSubjects,
    showWarningMain,
    warningMain,
    showWarning,
  } = useGlobalContext();

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
      history.push("/calc");
      setSelectedCareer("");
      setSelectedNumSubjects(0);
    }
  };

  return (
    <form className="main__form" onSubmit={(e) => handleSubmit(e)}>
      <div
        className={`warning ${showWarningMain ? "active" : ""}`}
        style={{
          top: `${warningMain.top}px`,
          left: `${warningMain.left}px`,
        }}
      >
        <ImWarning />
        <p>{warningMain.message || "completa este campo"}</p>
      </div>
      <label className="main__form__label">selecciona tu carrera:</label>
      <ComboBox
        items={careersList}
        nameValue={careersPath}
        holder="Selecciona una carrera"
        cbRef={careerRef}
      />
      <label className="main__form__label">
        selecciona tu cantidad de materias:
      </label>
      <ComboBox
        items={numbersList}
        nameValue={numbersList}
        holder="Selecciona la cantidad"
        cbRef={classesRef}
      />
      <button type="submit" className="main__form__btn">
        comenzar
      </button>
    </form>
  );
};

export default CareersForm;
