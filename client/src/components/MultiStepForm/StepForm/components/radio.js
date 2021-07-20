import React from "react";

export default function Radio({ option, name, checked, setForm }) {
  return (
    <div key={option._id} className={option.input_type}>
      <input
        type={option.input_type}
        id={option.title.toLowerCase()}
        value={option.title.toLowerCase()}
        name={name}
        checked={checked === option.title.toLowerCase()}
        onChange={setForm}
      />{" "}
      <label
        htmlFor={option.title.toLowerCase()}
        style={{
          backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/${option.image})`,
        }}
      >
        {option.title} <div className="overley" />
      </label>
    </div>
  );
}
