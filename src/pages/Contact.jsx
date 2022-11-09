//----------------------------Imports----------------------------
import React, { useRef, useReducer, useEffect, useState } from "react";
import Warning from "../components/Warning";
import { validateEmail, setType, warningInfo } from "../files/functions";
import { reducer, defaultWarning } from "../reducer";

//----------------------------Component----------------------------
const Contact = () => {
  //----------------------------Hooks----------------------------
  const [warning, warningDispatch] = useReducer(reducer, defaultWarning);
  const [showWarning, setShowWarning] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

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

  //----------------------------Functions-------------------------------------
  const handleSubmit = (e) => {
    if (nameRef.current.value === "") setType("NAME", nameRef);
    else if (nameRef.current.value.length < 3) setType("NAME_LENGTH", nameRef);
    else if (emailRef.current.value === "") setType("EMAIL", emailRef);
    else if (!validateEmail(emailRef.current.value))
      setType("INVALID_EMAIL", emailRef);
    else if (subjectRef.current.value === "") setType("SUBJECT", subjectRef);
    else if (messageRef.current.value === "") setType("MESSAGE", messageRef);
    else return;

    e.preventDefault();
    setShowWarning(true);
    warningDispatch({ type: "SET_WARNING_INFO", payload: warningInfo });
  };

  //----------------------------Rendering return----------------------------
  return (
    <main className="contact">
      <section>
        <div className="contact__title">
          <h2>contactame</h2>
          <div className="contact__underline"></div>
          <p>cuentanos tus dudas & comentarios acerca de la página</p>
        </div>
        <form
          action="https://formsubmit.co/ronpb8300@gmail.com"
          method="POST"
          autoComplete="off"
          className="contact__form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Warning showWarning={showWarning} warningInfo={warning} />
          <div className="contact__form__user-info">
            <input type="text" name="name" placeholder="nombre" ref={nameRef} />
            <input
              type="text"
              name="email"
              placeholder="correo electronico"
              ref={emailRef}
            />
            <input
              type="text"
              name="subject"
              placeholder="asunto"
              ref={subjectRef}
            />
            <input
              type="hidden"
              name="_next"
              value="https://itla-indice.netlify.app/contact"
            />
            <input type="hidden" name="_captcha" value="false" />
          </div>
          <textarea
            name="message"
            placeholder="escribe tu mensaje aquí"
            ref={messageRef}
          ></textarea>
          <button type="submit">enviar</button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
