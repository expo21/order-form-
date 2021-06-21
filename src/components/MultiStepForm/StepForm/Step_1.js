import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export default function Step_1({ formData, setForm, navigation, progress }) {
  const { gender, name, email, address, Tel } = formData.step_1;
  const [stepOneData, setStepOneData] = useState({});

  const [errors, setErrors] = useState({});
  useEffect(() => {
    progress(0);
  }, []);

  //handle click
  const handleNext = () => {
    if (
      formData.step_1.name !== undefined &&
      formData.step_1.Tel !== undefined
    ) {
      navigation.next();
    } else {
      let error = {};
      if (formData.step_1.name === undefined) {
        error.name = "Please provide your name.";
      }
      if (formData.step_1.Tel === undefined) {
        error.Tel = "Please provide your telepone number..";
      }
      setErrors(error);
    }
  };

  //

  const func = () => {
    if (errors.name !== "") {
      setErrors({ name: "" });
    }
    if (errors.Tel !== "") {
      setErrors({ Tel: "" });
    }
  };

  return (
    <Container>
      <div className="step_form-wrapper">
        <div className="selection_wrap gender-wrap">
          <div className="radio">
            <input
              id="men"
              type="radio"
              value="men"
              name="step_1.gender"
              checked={gender === "men"}
              onChange={setForm}
            />{" "}
            <label htmlFor="men" className="men">
              Men
            </label>
          </div>
          <div className="radio">
            <input
              id="women"
              type="radio"
              value="women"
              name="step_1.gender"
              checked={gender === "women"}
              onChange={setForm}
            />{" "}
            <label htmlFor="women" className="women">
              Women
            </label>
          </div>
        </div>
        <div className="inputs_wrap">
          <div className="inputs_wrap-inner">
            <input
              placeholder="Name"
              label="Name"
              type="text"
              value={name || ""}
              name="step_1.name"
              onFocus={func}
              onChange={setForm}
              autoComplete="off"
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div className="inputs_wrap-inner">
            <input
              placeholder="Email"
              label="Email"
              type="email"
              value={email || ""}
              name="step_1.email"
              onChange={setForm}
              autoComplete="off"
            />
          </div>
          <div className="inputs_wrap-inner">
            <input
              placeholder="Address"
              label="Address"
              type="text"
              value={address || ""}
              name="step_1.address"
              onChange={setForm}
              autoComplete="off"
            />
          </div>
          <div className="inputs_wrap-inner">
            <input
              placeholder="Telephone"
              label="Telephone"
              type="text"
              value={Tel || ""}
              onFocus={func}
              name="step_1.Tel"
              onChange={setForm}
              autoComplete="off"
            />
            {errors.Tel && <p>{errors.Tel}</p>}
          </div>
        </div>

        <div className="form_footer">
          <Button onClick={handleNext} className="next_btn">
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
}
