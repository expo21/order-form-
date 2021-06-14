import React, { useState } from "react";

import "./App.css";
import MultiStepForm from "./components/MultiStepForm";
import Logo from "./logo.png";

function App() {
  const [progressValue, setProgressValue] = useState(0);
  const progress = (value) => {
    setProgressValue(value);
  };

  return (
    <div>
      <div className="logo_wrapper">
        <a href="#">
          <img src={Logo} className="logo" />
        </a>
      </div>
      <div className="progress">
        <div className="bar" style={{ width: `${progressValue}%` }}>
          {/* <p className="percent">15%</p> */}
        </div>
      </div>
      <div className="red-400">
        <MultiStepForm progress={progress} />
      </div>
    </div>
  );
}

export default App;
