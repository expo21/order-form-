import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import "../Loader/loader.css";
export default function Spinner() {
  return (
    <>
      <div className="LoaderDiv">
        <img
          src={`https://firebasestorage.googleapis.com/v0/b/order-form-brown-bear.appspot.com/o/Spin-1s-204px.gif?alt=media&token=cd31ca29-2842-4c6f-9a54-48cc832b0ba9`}
        />
      </div>
    </>
  );
}
