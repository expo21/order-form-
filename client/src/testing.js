import React, { useState } from "react";
import axios from "axios";
export default function Testing() {
  const [newOption, setNewOption] = useState({
    title: "",
    gender: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newOption.image);
    formData.append("gender", newOption.gender);
    formData.append("title", newOption.title);

    console.log(formData);
    axios
      .post("http://localhost:3232/api/garmentType", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewOption({ ...newOption, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNewOption({ ...newOption, image: e.target.files[0] });
  };
  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="image"
          onChange={handleImage}
        />

        <input
          type="text"
          placeholder="title"
          name="title"
          value={newOption.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gender"
          value={newOption.gender}
          onChange={handleChange}
        />

        <input type="submit" />
      </form>
    </>
  );
}
