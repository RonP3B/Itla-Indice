import React from "react";
import { Link } from "react-router-dom";
import { ImWarning } from "react-icons/im";

const Error = () => {
  return (
    <section className="error">
      <ImWarning className="error__logo" />
      <h4 className="error__title">¡oops!, pagina no encontrada</h4>
      <Link to="/">
        <button className="error__btn">volver al inicio</button>
      </Link>
    </section>
  );
};

export default Error;
