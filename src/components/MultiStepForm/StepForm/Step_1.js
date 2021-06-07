import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export default function Step_1({ formData, setForm, navigation }) {
  const { gender, name, email, address, Tel } = formData;

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    console.log(formData);
    if (name !== "" && Tel !== "") {
      navigation.next();
    } else {
      let error = {};
      if (name === "") {
        error.name = "Please provide your name.";
      }
      if (Tel === "") {
        error.Tel = "Please provide your telepone number..";
      }
      setErrors(error);
    }
  };

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
        <h3 className="step_heading">Select your gender</h3>
        <div className="selection_wrap gender-wrap">
          <div className="radio">
            <input
              id="men"
              type="radio"
              value="men"
              name="gender"
              checked={gender === "men"}
              onChange={setForm}
            />{" "}
            <label for="men" className="men">
              Men
            </label>
          </div>
          <div className="radio">
            <input
              id="women"
              type="radio"
              value="women"
              name="gender"
              checked={gender === "women"}
              onChange={setForm}
            />{" "}
            <label for="women" className="women">
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
              value={name}
              name="name"
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
              value={email}
              name="email"
              onChange={setForm}
              autoComplete="off"
            />
          </div>
          <div className="inputs_wrap-inner">
            <input
              placeholder="Address"
              label="Address"
              type="text"
              value={address}
              name="address"
              onChange={setForm}
              autoComplete="off"
            />
          </div>
          <div className="inputs_wrap-inner">
            <input
              placeholder="Telephone"
              label="Telephone"
              type="text"
              value={Tel}
              onFocus={func}
              name="Tel"
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
