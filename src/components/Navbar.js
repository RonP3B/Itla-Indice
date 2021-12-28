//----------------------------Imports----------------------------
import React from "react";
import logo from "../assets/icono.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { FaBars } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { nanoid } from "nanoid";
import { listItems } from "../files/data";

//----------------------------Component----------------------------------
const Navbar = () => {
  //----------------------------Hooks------------------------------------
  const { width, showModal, openModal, closeModal } = useGlobalContext();

  //----------------------------Functions--------------------------------
  const createList = () => {
    const newList = listItems.map((item) => {
      const { name, path } = item;
      return (
        <li key={nanoid()}>
          <Link to={path} onClick={closeModal}>
            {name}
          </Link>
        </li>
      );
    });

    return newList;
  };

  //----------------------------Rendering return----------------------------
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="logo" />
          <p>ITLA-Índice</p>
        </Link>
        <FaBars className="navbar__bars" onClick={openModal} />
        {width < 768 ? (
          <article
            className="navbar__overlay"
            style={{ visibility: showModal ? "visible" : "hidden" }}
          >
            <div
              className={`navbar__modal ${
                showModal ? null : "navbar__modal-close"
              }`}
            >
              <img src={logo} alt="logo" />
              <ul className="navbar__list">{createList()}</ul>
              <RiCloseCircleFill onClick={closeModal} />
            </div>
          </article>
        ) : (
          <ul className="navbar__list">{createList()}</ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
