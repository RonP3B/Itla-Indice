//----------------------------Imports----------------------------
import React from "react";
import { Link } from "react-router-dom";
import { ImWarning } from "react-icons/im";

//----------------------------Component----------------------------
const Error = ({ message }) => {
  //----------------------------Rendering return---------------------------
  return (
    <section className="error">
      <ImWarning className="error__logo" />
      <h4 className="error__title">{message}</h4>
      <Link to="/">
        <button>volver al inicio</button>
      </Link>
    </section>
  );
};

export default Error;
