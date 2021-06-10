import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import { data_Step_3 as data } from "./data";
import { ContactlessOutlined } from "@material-ui/icons";

export default function Step_3({ formData, setForm, navigation }) {
  console.log(formData);

  const { ready_style_number } = formData;
  return (
    <div>
      <div className="step_form-wrapper">
        <h3 className="selection_subheading">Fitting</h3>
        <div className="selection_wrap">
          {data[formData.step_2.garment_type].fitting.map((i) => {
            return (
              <div key={i} className="radio">
                <input
                  type="radio"
                  id={i}
                  value={i}
                  name="step_3.fitting"
                  checked={formData.step_3.fitting === i}
                  onChange={setForm}
                />{" "}
                <label htmlFor={i}>{i}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="step_form-wrapper">
        <h3 className="selection_subheading">Fabric</h3>
        <div className="selection_wrap">
          {data[formData.step_2.garment_type].fabric.map((i) => {
            return (
              <div key={i} className="radio">
                <input
                  type="radio"
                  id={i}
                  value={i}
                  name="step_3.fabric"
                  checked={formData.step_3.fabric === i}
                  onChange={setForm}
                />
                <label htmlFor={i}>{i}</label>
              </div>
            );
          })}
        </div>
      </div>
      {formData.step_2.garment_type !== "Denim Jacket" && (
        <div className="step_form-wrapper">
          <h3 className="selection_subheading">Choose Style</h3>
          <div className="selection_wrap">
            {data[formData.step_2.garment_type].choose_style.map((i) => {
              return (
                <div key={i} className="radio">
                  <input
                    type="radio"
                    id={i}
                    value={i}
                    name="step_3.choose_style"
                    checked={formData.step_3.choose_style === i}
                    onChange={setForm}
                  />{" "}
                  <label htmlFor={i}>{i}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {formData.step_3.choose_style === "Ready Made Style" ? (
        <div className="step_form-wrapper">
          <label>Ready Style Number</label>
          <div>
            <input
              label="Name"
              type="text"
              value={ready_style_number}
              name="step_3.ready_style_number"
              onChange={setForm}
              autoComplete="off"
            />
          </div>
        </div>
      ) : formData.step_2.garment_type !== "Denim Jacket" &&
        formData.step_3.choose_style === "Custom Style" ? (
        <div>
          {" "}
          {data[formData.step_2.garment_type].custom.map((x) => {
            return (
              <div key={x.title} className="step_form-wrapper">
                {x.title}
                <div className="selection_wrap">
                  {x.type === "radio" ? (
                    x.options.map((i) => {
                      return (
                        <div key={i} className="radio">
                          <input
                            type="radio"
                            id={`${x.title.split(" ").join("_")}_${i}`}
                            value={i}
                            name={`step_3.custom.${x.title
                              .split(" ")
                              .join("_")}`}
                            checked={
                              formData.step_3.custom[
                                x.title.split(" ").join("_")
                              ] === i
                            }
                            onChange={setForm}
                          />
                          <label
                            htmlFor={`${x.title.split(" ").join("_")}_${i}`}
                          >
                            {i}
                          </label>
                        </div>
                      );
                    })
                  ) : x.type === "text" ? (
                    <div className="text">
                      <label>{x.title}</label>
                      <input
                        label="Name"
                        type="text"
                        value={
                          formData.step_3[
                            `custom.${x.title.split(" ").join("_")}`
                          ]
                        }
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
                        value={
                          formData.step_3[
                            `custom.${x.title.split(" ").join("_")}`
                          ]
                        }
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
      {formData.step_2.garment_type === "Denim Jacket" ? (
        <div className="step_form-wrapper">
          {/* Style Number _Denim Jacket */}
          <h4 className="selection_subheading">Style Number</h4>
          <div className="selection_wrap">
            {data[formData.step_2.garment_type].style_number.map((i) => {
              return (
                <div key={i}>
                  <div className="radio">
                    <input
                      type="radio"
                      id={i}
                      value={i}
                      name="step_3.custom.style_number"
                      checked={formData.step_3?.custom?.style_number === i}
                      onChange={setForm}
                    />{" "}
                    <label htmlFor={i}>{i}</label>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Thread Color - Denim Jacket */}
          <div className="selection_wrap">
            Thread color
            {data[formData.step_2.garment_type].thread_color.map((i) => {
              return (
                <div key={i}>
                  <div className="radio">
                    <input
                      type="radio"
                      id={i}
                      value={i}
                      name="step_3.custom.thread_color"
                      checked={formData.step_3.custom.thread_color === i}
                      onChange={setForm}
                    />{" "}
                    <label htmlFor={i}>{i}</label>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Style Number _Denim Jacket */}
          <div className="selection_wrap">
            Button
            {data[formData.step_2.garment_type].button.map((i) => {
              return (
                <div key={i}>
                  <div className="radio">
                    <input
                      type="radio"
                      id={`button_${i}`}
                      value={i}
                      name="step_3.custom.button"
                      checked={formData.step_3.custom.button === i}
                      onChange={setForm}
                    />{" "}
                    <label htmlFor={`button_${i}`}>{i}</label>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Leather Label _Denim Jacket */}
          <div className="selection_wrap">
            Leather Label
            {data[formData.step_2.garment_type].leather_Label.map((i) => {
              return (
                <div key={i}>
                  <div className="radio">
                    <input
                      type="radio"
                      id={`leather_Label_${i}`}
                      value={i}
                      name="step_3.custom.leather_Label"
                      checked={formData.step_3.custom.leather_Label === i}
                      onChange={setForm}
                    />{" "}
                    <label htmlFor={`leather_Label_${i}`}>{i}</label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="form_footer">
        <Button onClick={() => navigation.previous()}>Back</Button>
        <Button onClick={() => navigation.next()}>Next</Button>
      </div>
    </div>
  );
}
