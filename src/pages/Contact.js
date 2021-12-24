//----------------------------Imports----------------------------
import React, { useRef } from "react";
import Warning from "../components/Warning";
import { useGlobalContext } from "../context";
import { validateEmail, setType, warningInfo } from "../files/functions";

//----------------------------Component----------------------------
const Contact = () => {
  //----------------------------Hooks----------------------------
  const { showWarningContact, warningContact, showWarning } =
    useGlobalContext();
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

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
    showWarning(warningInfo, 1);
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
          <Warning
            showWarning={showWarningContact}
            warningInfo={warningContact}
          />
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
              value="http://localhost:3000/contact"
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
