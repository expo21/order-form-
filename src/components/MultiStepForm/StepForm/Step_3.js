import React from "react";
import Button from "@material-ui/core/Button";

const data = {
  "Denim Pants": {
    fitting: ["Skinny", "Slim", "Straight", "Comfortable"],
    fabric: ["fabric_1", "fabric_2", "fabric_3"],
    choose_style: ["Ready Made Style", "Custom Style"],
  },
  Shirt: {
    fitting: ["Slim", "Comfortable"],
    fabric: ["fabric_1", "fabric_2", "fabric_3"],
    choose_style: ["Ready Made Style", "Custom Style"],
  },
  "T-Shirt / Popover": [],
  Jacket: [],

  "Jeans pant": [],
  "Denim Jacket": [],
  "Linen Top": [],
  "Cotton Top": [],
};

export default function Step_3({ formData, setForm, navigation }) {
  console.log(formData);

  return (
    <div>
      third step
      {data[formData.garment_type].fitting.map((i) => {
        return (
          <div key={i}>
            <div>{i}</div>
          </div>
        );
      })}
      {data[formData.garment_type].fabric.map((i) => {
        return (
          <div key={i}>
            <div>{i}</div>
          </div>
        );
      })}
      {data[formData.garment_type].choose_style.map((i) => {
        return (
          <div key={i}>
            <div className="radio">
              <input
                type="radio"
                value={i}
                name="choose_style"
                checked={formData.choose_style === i}
                onChange={setForm}
              />{" "}
              {i}
            </div>
          </div>
        );
      })}
      {formData.choose_style === "Ready Made Style" ? (
        <div>ready made style options </div>
      ) : formData.choose_style === "Custom Style" ? (
        <div> custom style</div>
      ) : null}
      <div style={{ marginTop: "1rem" }}>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigation.next()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
