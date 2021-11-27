import React from "react";
import { useGlobalContext } from "../context";
import { ImWarning } from "react-icons/im";

const Contact = () => {
  const { formErrMsg } = useGlobalContext();

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
        >
          <div className="main__form__error">
            <ImWarning />
            <p>{formErrMsg || "Completa este campo"}</p>
          </div>
          <div className="contact__form__user-info">
            <input type="text" name="name" placeholder="nombre" />
            <input type="email" name="email" placeholder="correo electronico" />
            <input type="text" name="subject" placeholder="asunto" />
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
          ></textarea>
          <button type="submit">enviar</button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
