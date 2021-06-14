import React, { useEffect } from "react";
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

export default function Step_4({ formData, setForm, navigation, progress }) {
  console.log(formData);
  useEffect(() => {
    progress(75);
  }, []);
  const onchange = (e) => {
    console.log(e);
  };
  return (
    <div className="step_form-wrapper">
      <h3 className="step_heading">Measurements</h3>
      <div className="inputs_wrap">
        {data.map((x) => {
          return (
            <div className="inputs_wrap-inner">
              <input
                placeholder={x}
                label={x}
                type="number"
                value={formData[x]}
                name={`step_4.${x}`}
                // onFocus={func}
                onChange={setForm}
                autoComplete="off"
              />
              {/* {errors.name && <p>{errors.name}</p>} */}
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
      </div>
      <div className="form_footer">
        <Button onClick={() => navigation.previous()}>Back</Button>
        <Button onClick={() => navigation.next()}>Review</Button>
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
