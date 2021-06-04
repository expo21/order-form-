import React from "react";
import Button from "@material-ui/core/Button";

const data = {
  men: [
    { label: 1, value: "Denim Pants" },
    { label: 2, value: "Shirt" },
    { label: 3, value: "T-Shirt / Popover" },
    { label: 4, value: "Jacket" },
  ],
  women: [
    { label: 1, value: "Jeans pant" },
    { label: 2, value: "Denim Jacket" },
    { label: 3, value: "Linen Top" },
    { label: 4, value: "Cotton Top" },
  ],
};

export default function Step_2({ formData, setForm, navigation }) {
  console.log(formData);
  return (
    <div>
      second step
      {data[formData.gender].map((i, index) => {
        return (
          <div key={index} className="radio">
            <input
              type="radio"
              value={i.value}
              name="garment_type"
              checked={formData.garment_type === i.value}
              onChange={setForm}
            />{" "}
            {i.value}
          </div>
        );
      })}
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
