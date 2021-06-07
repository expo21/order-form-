import React from "react";
import Button from "@material-ui/core/Button";

import { data_Step_3 as data } from "./data";

export default function Step_3({ formData, setForm, navigation }) {
  console.log(formData);
  const { ready_style_number } = formData;

  return (
    <div>
      third step
      <div>
        <h3>Fitting</h3>
        {data[formData.garment_type].fitting.map((i) => {
          return (
            <div key={i}>
              <div className="radio">
                <input
                  type="radio"
                  value={i}
                  name="fitting"
                  checked={formData.fitting === i}
                  onChange={setForm}
                />{" "}
                {i}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Fabric</h3>
        {data[formData.garment_type].fabric.map((i) => {
          return (
            <div key={i}>
              <div className="radio">
                <input
                  type="radio"
                  value={i}
                  name="fabric"
                  checked={formData.fabric === i}
                  onChange={setForm}
                />{" "}
                {i}
              </div>
            </div>
          );
        })}
      </div>
      {formData.garment_type !== "Denim Jacket" && (
        <div>
          <h3>Choose Style</h3>
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
        </div>
      )}
      {formData.choose_style === "Ready Made Style" ? (
        <div>
          {" "}
          <label>Ready Style Number</label>
          <input
            label="Name"
            type="text"
            value={ready_style_number}
            name="ready_style_number"
            onChange={setForm}
            autoComplete="off"
          />
        </div>
      ) : formData.choose_style === "Custom Style" ? (
        <div>
          {" "}
          {data[formData.garment_type].custom.map((x) => {
            return (
              <div key={x}>
                {x.title}
                <div>
                  {x.type === "radio" ? (
                    x.options.map((i) => {
                      return (
                        <div className="radio">
                          <input
                            type="radio"
                            value={i}
                            name={x.title}
                            checked={formData[x.title] === i}
                            onChange={setForm}
                          />{" "}
                          {i}
                        </div>
                      );
                    })
                  ) : x.type === "text" ? (
                    <div className="text">
                      <label>{x.title}</label>
                      <input
                        label="Name"
                        type="text"
                        value={formData[x.title]}
                        name={x.title}
                        onChange={setForm}
                        autoComplete="off"
                      />
                    </div>
                  ) : (
                    <div className="textarea">
                      <label>{x.title}</label>
                      <input
                        label="Name"
                        type="textarea"
                        value={formData[x.title]}
                        name={x.title}
                        onChange={setForm}
                        autoComplete="off"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {formData.garment_type === "Denim Jacket" ? (
        <div>
          {/* Style Number _Denim Jacket */}
          {data[formData.garment_type].style_number.map((i) => {
            return (
              <div key={i}>
                <div className="radio">
                  <input
                    type="radio"
                    value={i}
                    name="style_number"
                    checked={formData.style_number === i}
                    onChange={setForm}
                  />{" "}
                  {i}
                </div>
              </div>
            );
          })}
          {/* Thread Color - Denim Jacket */}
          {data[formData.garment_type].thread_color.map((i) => {
            return (
              <div key={i}>
                <div className="radio">
                  <input
                    type="radio"
                    value={i}
                    name="thread_color"
                    checked={formData.thread_color === i}
                    onChange={setForm}
                  />{" "}
                  {i}
                </div>
              </div>
            );
          })}
          {/* Style Number _Denim Jacket */}
          {data[formData.garment_type].button.map((i) => {
            return (
              <div key={i}>
                <div className="radio">
                  <input
                    type="radio"
                    value={i}
                    name="button"
                    checked={formData.button === i}
                    onChange={setForm}
                  />{" "}
                  {i}
                </div>
              </div>
            );
          })}
          {/* Leather Label _Denim Jacket */}
          {data[formData.garment_type].leather_Label.map((i) => {
            return (
              <div key={i}>
                <div className="radio">
                  <input
                    type="radio"
                    value={i}
                    name="leather_Label"
                    checked={formData.leather_Label === i}
                    onChange={setForm}
                  />{" "}
                  {i}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="form_footer">
        <Button onClick={() => navigation.previous()}>Back</Button>
        <Button onClick={() => navigation.next()}>Next</Button>
      </div>
    </div>
  );
}
