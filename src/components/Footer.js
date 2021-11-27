import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { author } from "../files/data";

const Footer = () => {
  return (
    <footer className="footer">
      <p>creador - {author} - todos los derechos reservados ©</p>
      <p>contactos en:</p>
      <ul className="footer__social">
        <li>
          <FaFacebookF className="footer__social__facebook" />
        </li>
        <li>
          <AiFillGithub className="footer__social__github" />
        </li>
        <li>
          <AiFillLinkedin className="footer__social__linkedin" />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
