import React, { useState } from "react";
import MultiStepForm from "../../components/MultiStepForm/index";

export default function OrderForm() {
  const [progressValue, setProgressValue] = useState(0);
  const progress = (value) => {
    setProgressValue(value);
  };
  return (
    <div>
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
