//----------------------------Imports------------------------------------
import React, { useState, useEffect, createRef, useReducer } from "react";
import ClassGrade from "../components/ClassGrade";
import Warning from "../components/Warning";
import Error from "../components/Error";
import { getWarningInfo } from "../files/functions";
import { useGlobalContext } from "../context";
import { IoMdSchool } from "react-icons/io";
import { useFetch } from "../customHooks/useFetch";
import { apiItla } from "../files/data";
import { reducer, defaultWarning } from "../reducer";

//----------------------------Ref arrays---------------------------------
const comboRefs = [];
const spinnerRefs = [];

//----------------------------Component----------------------------------
const Calc = () => {
  //----------------------------Hooks------------------------------------
  const { careers, selectedNumSubjects, setAverage, average, width, navigate } =
    useGlobalContext();
  const [warning, warningDispatch] = useReducer(reducer, defaultWarning);
  const [showWarning, setShowWarning] = useState(false);
  const [columns, setColumns] = useState(0);
  const [message, setMessage] = useState("");
  const { data: dataClasses, loading: loadingClasses } = useFetch(
    apiItla + careers
  );

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

  useEffect(() => {
    if (selectedNumSubjects < 4) setColumns(0);
    else if (selectedNumSubjects < 9 || width < 1199) setColumns(2);
    else if (width > 1199) setColumns(3);
  }, [selectedNumSubjects, width]);

  useEffect(() => {
    let msg =
      "El índice que obtuviste en este cuatrimestre entra en la categoría de: ";

    if (average >= 3.8) setMessage(`${msg} sobresaliente.`);
    else if (average >= 3.5) setMessage(`${msg} muy bueno.`);
    else if (average >= 3.2) setMessage(`${msg} bueno.`);
    else if (average > 2.0) setMessage(`${msg} normal.`);
    else setMessage(`${msg} debajo del requerimiento.`);
  }, [average]);

  //----------------------------Functions-------------------------------------------
  const validateForm = () => {
    const defaultSubject = "Selecciona la materia";

    for (let i = 0; i < selectedNumSubjects; i++) {
      const selectedSubject = comboRefs[i].current.textContent;

      if (selectedSubject === defaultSubject) {
        setShowWarning(true);
        warningDispatch({
          type: "SET_WARNING_INFO",
          payload: getWarningInfo(comboRefs[i], "selecciona una materia"),
        });
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
    return (
      <main className="calc">
        <section>
          <h2 className="calc__title">!índice cuatrimestral obtenido!</h2>
          <div className="calc__container">
            <p>Obtuviste un índice de {average} en este cuatrimestre</p>
            <p>{message}</p>
            <p>!sigue esforzándote!</p>
          </div>
          <button onClick={() => navigate("/")}>volver al inicio</button>
        </section>
      </main>
    );
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
          <Warning showWarning={showWarning} warningInfo={warning} />
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
        <button
          onClick={() => {
            if (validateForm()) getAverage();
          }}
        >
          calcular
        </button>
      </section>
    </main>
  );
};

export default Calc;
