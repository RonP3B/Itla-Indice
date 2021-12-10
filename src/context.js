import React, { useState, useContext, useEffect } from "react";
import { useFetch } from "./useFetch";

const apiItla = "https://nodejs-itlamaterias.herokuapp.com/carreras";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [careers, setCareers] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedNumSubjects, setSelectedNumSubjects] = useState(0);
  const [formErrMsg, setFormErrMsg] = useState("");
  const [showWarningMain, setShowWarningMain] = useState(false);
  const [showWarningContact, setShowWarningContact] = useState(false);
  const { data, loading } = useFetch(apiItla + careers);
  const [height, setHeight] = useState(0);
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

  const careersList = data.map((item) => item.career);
  const careersPath = data.map((path) => path.path);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  useEffect(() => {
    const close = setTimeout(() => {
      setShowWarningMain(false);
      setShowWarningContact(false);
    }, 2500);

    return () => {
      clearTimeout(close);
    };
  }, [showWarningMain, showWarningContact]);

  useEffect(() => {
    const hide = setTimeout(() => {
      setWarningContact({ ...warningContact, top: -500, left: 0, message: "" });
      setWarningMain({ ...warningMain, top: -500, left: 0, message: "" });
    }, 3500);

    return () => {
      clearTimeout(hide);
    };
  }, [warningContact, warningMain]);

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
  };

  return (
    <AppContext.Provider
      value={{
        width,
        showModal,
        openModal,
        closeModal,
        data,
        loading,
        setSelectedCareer,
        setSelectedNumSubjects,
        selectedCareer,
        selectedNumSubjects,
        formErrMsg,
        setFormErrMsg,
        careersList,
        careersPath,
        height,
        setHeight,
        warningContact,
        warningMain,
        showWarning,
        showWarningMain,
        showWarningContact,
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
