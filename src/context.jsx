//----------------------------Imports-------------------------------
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import { apiItla } from "./files/data";
import { useLocationChange } from "./customHooks/useLocationChange";

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
  const navigate = useNavigate();
  const location = useLocation();
  const { data: dataCareers, loading: loadingCareers } = useFetch(apiItla);

  useEffect(() => {
    const getWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  useLocationChange((location) => {
    if (location.pathname.length === 1) {
      setSelectedCareer("");
      setSelectedNumSubjects(0);
      setAverage(0);
    }
  });

  //----------------------------Rendering return----------------------------
  return (
    <AppContext.Provider
      value={{
        careers,
        width,
        dataCareers,
        loadingCareers,
        selectedCareer,
        selectedNumSubjects,
        average,
        navigate,
        setSelectedCareer,
        setSelectedNumSubjects,
        setAverage,
        setCareers,
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
