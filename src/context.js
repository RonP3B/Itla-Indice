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
  const [showFormErrMsg, setShowFormErrMsg] = useState(false);
  const { data, loading } = useFetch(apiItla + careers);
  const [height, setHeight] = useState(0);
  const [elementPosition, setElementPosition] = useState("");

  const getWidth = () => setWidth(window.innerWidth);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const careersList = data.map((item) => item.career);
  const careersPath = data.map((path) => path.path);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

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
        showFormErrMsg,
        setShowFormErrMsg,
        careersList,
        careersPath,
        height,
        setHeight,
        elementPosition,
        setElementPosition,
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
