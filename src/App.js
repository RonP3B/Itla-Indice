//----------------------Imports-------------------
import React from "react";
import { Route, Switch } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Calc from "./pages/Calc";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/calc">
          <Calc />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
