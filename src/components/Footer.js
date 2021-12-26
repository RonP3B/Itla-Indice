//----------------------------Imports----------------------------
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { author } from "../files/data";

//----------------------------Component----------------------------
const Footer = () => {
  //----------------------------Rendering return-------------------
  return (
    <footer className="footer">
      <p>creador - {author} - todos los derechos reservados ©</p>
      <p>contactos en:</p>
      <ul className="footer__social">
        <li>
          <a
            href="https://es-la.facebook.com/roniell.perez.37"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="footer__social__facebook" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/RonP3B"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub className="footer__social__github" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/roniell-p%C3%A9rez-967882229/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin className="footer__social__linkedin" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
