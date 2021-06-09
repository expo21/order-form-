import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const data = {
  men: [
    { label: 1, value: "Denim Pants" },
    { label: 2, value: "Shirt" },
    { label: 3, value: "T-Shirt / Popover" },
    { label: 4, value: "Denim Jacket" },
  ],
  women: [
    { label: 1, value: "Jeans Pant" },
    { label: 2, value: "Denim Jacket" },
    { label: 3, value: "Linen Top" },
    { label: 4, value: "Cotton Top" },
  ],
};

export default function Step_2({ formData, setForm, navigation }) {
  const [error, setError] = useState("");
  console.log(formData);
  const nextFunction = () => {
    if (formData.step_2.garment_type) {
      // setError("");
      navigation.next();
    } else {
      setError("Please Choose Grament Type.");
    }
  };
  return (
    <div>
      <h3 className="step_heading">Choose your clothes</h3>
      <div className="selection_wrap gender-wrap">
        {data[formData.step_1.gender].map((i, index) => {
          return (
            <div key={index} className="radio">
              <input
                id={i.value}
                type="radio"
                value={i.value}
                name="step_2.garment_type"
                checked={formData.step_2.garment_type === i.value}
                onChange={setForm}
              />{" "}
              {/* {i.value} */}
              <label for={i.value}>{i.value}</label>
            </div>
          );
        })}
      </div>

      <div className="form_footer">
        {error && formData.step_2.garment_type === "" ? <p>{error}</p> : null}
        <Button onClick={() => navigation.previous()}>Back</Button>
        <Button onClick={() => nextFunction()}>Next</Button>
      </div>
    </div>
  );
}
