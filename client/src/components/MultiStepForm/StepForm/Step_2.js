import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { garmentListByGender } from "../../../helper/helperFunctions";

export default function Step_2({ formData, setForm, navigation, progress }) {
  const [error, setError] = useState("");
  const [APIdata, setAPIdata] = useState([]);

  useEffect(() => {
    progress(25);

    garmentListByGender(formData.step_1.gender).then((result) => {
      if (result.length > 0) {
        setAPIdata(result);
      } else {
        setAPIdata([]);
      }
    });
  }, []);
  //next function
  const nextFunction = () => {
    if (formData.step_2.garment_type) {
      // setError("");
      navigation.next();
    } else {
      setError("Please Choose Grament Type.");
    }
  };

  //choseCloth
  const chooseCloth = (e) => {
    setForm(e);
  };

  if (APIdata.length > 0) {
    return (
      <div>
        <h3 className="step_heading">Choose your clothes</h3>
        <div className="selection_wrap gender-wrap">
          {APIdata.map((i, index) => {
            return (
              <div key={index} className="radio">
                <input
                  id={i.title}
                  type="radio"
                  value={i.title}
                  name="step_2.garment_type"
                  checked={formData.step_2.garment_type === i.title}
                  onChange={(e) => chooseCloth(e)}
                />
                <label
                  htmlFor={i.title}
                  style={{
                    backgroundImage: `url(${window.APIPATH}/uploads/${i.image})`,
                  }}
                >
                  {i.title} <div className="overley" />
                </label>
              </div>
            );
          })}
        </div>
        <div className="step_form-wrapper">
          <div className="form_footer">
            {error && formData.step_2.garment_type === "" ? (
              <p>{error}</p>
            ) : null}
            <Button onClick={() => navigation.previous()}>Back</Button>
            <Button onClick={() => nextFunction()}>Next</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Garment types are not available . Please add some ...</h3>
      </div>
    );
  }
}
