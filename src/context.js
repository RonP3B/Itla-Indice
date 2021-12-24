//----------------------------Imports-------------------------------
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "./useFetch";
import { apiItla } from "./files/data";

//----------------------------App Context----------------------------
const AppContext = React.createContext();

//----------------------------Component------------------------------
const AppProvider = ({ children }) => {
  //----------------------------Hooks--------------------------------
  const [careers, setCareers] = useState("");
  const [average, setAverage] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedNumSubjects, setSelectedNumSubjects] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [showWarningMain, setShowWarningMain] = useState(false);
  const [showWarningContact, setShowWarningContact] = useState(false);
  const [showWarningCalc, setShowWarningCalc] = useState(false);
  const history = useHistory();
  const { data: dataCareers, loading: loadingCareers } = useFetch(apiItla);

  const [warningMain, setWarningMain] = useState({
    top: -500,
    left: 0,
    message: "",
  });
  const [warningContact, setWarningContact] = useState({
    top: -500,
    left: 0,
    message: "",
  });
  const [warningCalc, setWarningCalc] = useState({
    top: -500,
    left: 0,
    message: "",
  });

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname.length === 1) {
        setSelectedCareer("");
        setSelectedNumSubjects(0);
        setAverage(0);
      }
    });
  }, [history]);

  useEffect(() => {
    const close = setTimeout(() => {
      setShowWarningMain(false);
      setShowWarningContact(false);
      setShowWarningCalc(false);
    }, 2500);

    return () => {
      clearTimeout(close);
    };
  }, [showWarningMain, showWarningContact, showWarningCalc]);

  useEffect(() => {
    const hide = setTimeout(() => {
      setWarningContact({ ...warningContact, top: -500, left: 0, message: "" });
      setWarningMain({ ...warningMain, top: -500, left: 0, message: "" });
      setWarningCalc({ ...warningCalc, top: -500, left: 0, message: "" });
    }, 3500);

    return () => {
      clearTimeout(hide);
    };
  }, [warningContact, warningMain, warningCalc]);

  //----------------------------Functions----------------------------------------
  const getWidth = () => setWidth(window.innerWidth);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const showWarning = (position, page) => {
    const { top, left, message } = position;

    if (page === 0) {
      setWarningMain({
        ...warningMain,
        top,
        left,
        message,
      });
      setShowWarningMain(true);
    }
    if (page === 1) {
      setWarningContact({
        ...warningContact,
        top,
        left,
        message,
      });
      setShowWarningContact(true);
    }
    if (page === 2) {
      setWarningCalc({
        ...warningCalc,
        top,
        left,
        message,
      });
      setShowWarningCalc(true);
    }
  };

  //----------------------------Rendering return----------------------------
  return (
    <AppContext.Provider
      value={{
        careers,
        width,
        showModal,
        dataCareers,
        loadingCareers,
        selectedCareer,
        selectedNumSubjects,
        warningContact,
        warningMain,
        warningCalc,
        showWarningMain,
        showWarningContact,
        showWarningCalc,
        history,
        average,
        openModal,
        closeModal,
        setSelectedCareer,
        setSelectedNumSubjects,
        setAverage,
        setCareers,
        showWarning,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
