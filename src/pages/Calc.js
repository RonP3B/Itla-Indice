//----------------------------Imports----------------------------
import React, { useState, useEffect, createRef } from "react";
import ClassGrade from "../components/ClassGrade";
import Warning from "../components/Warning";
import Error from "../components/Error";
import { getWarningInfo } from "../files/functions";
import { useGlobalContext } from "../context";
import { IoMdSchool } from "react-icons/io";
import { useFetch } from "../useFetch";
import { apiItla } from "../files/data";

//----------------------------Ref arrays----------------------------
const comboRefs = [];
const spinnerRefs = [];

//----------------------------Component----------------------------
const Calc = () => {
  //----------------------------Hooks----------------------------
  const {
    careers,
    selectedNumSubjects,
    showWarningCalc,
    warningCalc,
    showWarning,
    setAverage,
    average,
    width,
  } = useGlobalContext();

  const [columns, setColumns] = useState(0);

  const { data: dataClasses, loading: loadingClasses } = useFetch(
    apiItla + careers
  );

  useEffect(() => {
    if (selectedNumSubjects < 4) setColumns(0);
    else if (selectedNumSubjects < 9 || width < 1199) setColumns(2);
    else if (width > 1199) setColumns(3);
  }, [selectedNumSubjects, width]);

  //----------------------------Functions----------------------------
  const validateForm = () => {
    const defaultSubject = "Selecciona la materia";

    for (let i = 0; i < selectedNumSubjects; i++) {
      const selectedSubject = comboRefs[i].current.textContent;

      if (selectedSubject === defaultSubject) {
        showWarning(getWarningInfo(comboRefs[i], "selecciona una materia"), 2);
        return false;
      }
    }

    return true;
  };

  const getAverage = () => {
    let points = 0,
      credits = 0;

    for (let i = 0; i < selectedNumSubjects; i++) {
      const subject = comboRefs[i].current.textContent;
      const grade = spinnerRefs[i].current.textContent;
      const { CREDITOS } = dataClasses.filter(
        (item) => item.ASIGNATURA === subject
      )[0];

      credits += CREDITOS;

      if (grade === "A") points += 4 * CREDITOS;
      else if (grade === "B") points += 3 * CREDITOS;
      else if (grade === "C") points += 2 * CREDITOS;
    }

    setAverage(parseFloat(points / credits).toFixed(1));
  };

  const handleBtnEvent = () => {
    if (validateForm()) getAverage();
  };

  //----------------------------Conditional rendering returns----------------------------
  if (careers === "" || selectedNumSubjects === 0) {
    return <Error message={"debes seleccionar una carrera primero"} />;
  }

  if (loadingClasses) {
    return (
      <div className="loading">
        <IoMdSchool />
      </div>
    );
  }

  if (average !== 0) {
    return <h2>Resultado: {average} (metele un css kbrom)</h2>;
  }

  //----------------------------Rendering return----------------------------
  return (
    <main className="calc">
      <section>
        <h2 className="calc__title">!vamos a realizar el cálculo!</h2>
        <form
          className={`calc__form ${width > 767 ? "active" : ""}`}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          <Warning showWarning={showWarningCalc} warningInfo={warningCalc} />
          {[...Array(selectedNumSubjects)].map((item, index) => {
            comboRefs.push(createRef());
            spinnerRefs.push(createRef());
            return (
              <ClassGrade
                comboData={dataClasses}
                comboRef={comboRefs[index]}
                spinnerRef={spinnerRefs[index]}
                key={index}
              />
            );
          })}
        </form>
        <button className="calc__form__btn" onClick={handleBtnEvent}>
          calcular
        </button>
      </section>
    </main>
  );
};

export default Calc;
