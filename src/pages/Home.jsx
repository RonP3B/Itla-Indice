import React from "react";
import CareersForm from "../components/CareersForm";
import { useGlobalContext } from "../context";
import { IoMdSchool } from "react-icons/io";

const Home = () => {
  const { loadingCareers } = useGlobalContext();

  if (loadingCareers) {
    return (
      <div className="loading">
        <IoMdSchool />
      </div>
    );
  }

  return (
    <main className="main">
      <section>
        <h4 className="main__title">¡calcularemos tu índice cuatrimestral!</h4>
        <CareersForm />
      </section>
    </main>
  );
};

export default Home;
