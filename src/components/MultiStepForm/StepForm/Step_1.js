import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

export default function Step_1({ formData, setForm, navigation }) {
  const { gender, name, email, address, tel } = formData;

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    console.log(formData);
    if (name !== "" && tel !== "") {
      navigation.next();
    } else {
        let error = {}
      if (name === "") {
        console.log("hjsdgfj");
        setErrors({ name: "Please provide your name." });
      }
      if (tel === "") {
        setErrors({ tel: "Please provide your telepone number.." });
      }
      console.log(errors);
    }
  };

  const func = () => {
    if (errors.name !== "") {
      setErrors({ name: "" });
    }
    if (errors.tel !== "") {
      setErrors({ tel: "" });
    }
  };

  return (
    <Container maxWidth="xs">
      <h3>Names</h3>
      <div className="radio">
        <input
          type="radio"
          value="men"
          name="gender"
          checked={gender === "men"}
          onChange={setForm}
        />{" "}
        Male
      </div>
      <div className="radio">
        <input
          type="radio"
          value="women"
          name="gender"
          checked={gender === "women"}
          onChange={setForm}
        />{" "}
        Women
      </div>
      <div>
        <label>Name</label>

        <input
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
      <div>
        <label>Email</label>
        <input
          label="Email"
          type="email"
          value={email}
          name="email"
          onChange={setForm}
          autoComplete="off"
        />
      </div>
      <div>
        <label>Address</label>
        <input
          label="Address"
          type="text"
          value={address}
          name="address"
          onChange={setForm}
          autoComplete="off"
        />
      </div>
      <div>
        <label>Telephone</label>
        <input
          label="Telephone"
          type="text"
          value={tel}
          onFocus={func}
          name="tel"
          onChange={setForm}
          autoComplete="off"
        />
        {errors.tel && <p>{errors.tel}</p>}
      </div>

      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={handleNext}
      >
        Next
      </Button>
    </Container>
  );
}
