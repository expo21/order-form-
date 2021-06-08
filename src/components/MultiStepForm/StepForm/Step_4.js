import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
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
  console.log(formData);
  const onchange = (e) => {
    console.log(e);
  };
  return (
    <div>
      Measurements
      {data.map((x) => {
        return (
          <div>
            <div className="inputs_wrap-inner">
              <input
                placeholder={x}
                label={x}
                type="text"
                value={formData[x]}
                name={x}
                // onFocus={func}
                onChange={setForm}
                autoComplete="off"
              />
              {/* {errors.name && <p>{errors.name}</p>} */}
            </div>
          </div>
          // <div key={x} className="input-group">
          //   {x}
          //   <span className="input-group-btn">
          //     <button
          //       type="button"
          //       className="btn btn-default btn-number"
          //       disabled="disabled"
          //       data-type="minus"
          //       data-field={x}
          //       onChange={(e) => onchange(e)}
          //     >
          //       <RemoveIcon />
          //     </button>
          //   </span>
          //   <input
          //     type="text"
          //     id={x}
          //     name={x}
          //     // className="form-control input-number"
          //     value={formData.chest}
          //     min="1"
          //     max="10"
          //     onChange={setForm}
          //     // onChangeCapture={(e) => onchange(e)}
          //   />
          //   <span className="input-group-btn">
          //     <button
          //       type="button"
          //       className="btn btn-default btn-number"
          //       data-type="plus"
          //       data-field={x}
          //       onChange={(e) => onchange(e)}
          //     >
          //       <AddIcon />
          //     </button>
          //   </span>
          // </div>
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
          Review
        </Button>
      </div>
    </div>
  );
}

{
  /* <div>
        {data.map((i) => {
          return (
            <div key={i} className="inputs_wrap">
              
              <div className="inputs_wrap-inner">
                <input
                  placeholder={i}
                  label={i}
                  type="number"
                  value={formData[i]}
                  name={i}
                  // onFocus={func}
                  onChange={setForm}
                  autoComplete="off"
                />

                
              </div>
            </div>
          );
        })}
      </div> */
}
