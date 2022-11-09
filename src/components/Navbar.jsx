//----------------------------Imports----------------------------
import React, { useEffect, useRef } from "react";
import logo from "/assets/images/icono.png";
import background from "/assets/images/background.jpg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { FaBars } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { nanoid } from "nanoid";
import { listItems } from "../files/data";

//----------------------------Component----------------------------------
const Navbar = () => {
  //----------------------------Hooks------------------------------------
  const { width } = useGlobalContext();
  const [showModal, setShowModal] = React.useState(false);
  const container = useRef();

  useEffect(() => {
    const closeModal = () => setShowModal(false);
    const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target))
        closeModal();
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [container]);

  //----------------------------Functions--------------------------------
  const createList = () => {
    const newList = listItems.map((item) => {
      const { name, path } = item;
      return (
        <li key={nanoid()}>
          <Link to={path} onClick={() => setShowModal(false)}>
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
        <FaBars className="navbar__bars" onClick={() => setShowModal(true)} />
        {width < 768 ? (
          <article
            className="navbar__overlay"
            style={{ visibility: showModal ? "visible" : "hidden" }}
          >
            <div
              className={`navbar__modal ${
                showModal ? "" : "navbar__modal-close"
              }`}
              ref={container}
              style={{
                backgroundImage: `url(${background})`,
              }}
            >
              <img src={logo} alt="logo" />
              <ul className="navbar__list">{createList()}</ul>
              <RiCloseCircleFill onClick={() => setShowModal(false)} />
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
