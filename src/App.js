import React from "react";

import "./App.css";
import MultiStepForm from "./components/MultiStepForm";
import Logo from "./logo.png";

function App() {
  return (
    <div>
      <div className="logo_wrapper">
        <a href="#">
          <img src={Logo} className="logo" />
        </a>
      </div>
      <div className="progress">
        <div className="bar" style={{width: "35%"}}>
          <p className="percent">35%</p>
        </div>
      </div>
      <div className="red-400">
        <MultiStepForm />
      </div>
    </div>
  );
}

export default App;
