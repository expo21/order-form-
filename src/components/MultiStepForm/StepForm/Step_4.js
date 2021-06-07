import React from "react";
import Button from "@material-ui/core/Button";

const data = [
  "Chest",
  "Stomach",
  "Hips",
  "Sleeve",
  "Shoulder",
  "Neck",
  "Cuff",
  "Length",
  "Bicep",
];

export default function Step_4({ formData, setForm, navigation }) {
  return (
    <div>
      Measurements
      <div>
        {data.map((i) => {
          return (
            <div key={i}>
              {/* range box with limited values */}
              {i}
            </div>
          );
        })}
      </div>
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
          Review
        </Button>
      </div>
    </div>
  );
}
