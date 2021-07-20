import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MultiStepForm from "../../components/MultiStepForm/index";
import { getOrderDetails } from "../../helper/helperFunctions";
import "../OrderForm/orderForm.css";
export default function OrderDetails() {
  let { orderNumber } = useParams();
  const [progressValue, setProgressValue] = useState(0);
  const progress = (value) => {
    setProgressValue(value);
  };
  const [Order, setOrder] = useState(null);

  useEffect(() => {
    getOrderDetails(orderNumber)
      .then((response) => {
        if (response) {
          setOrder(response);
        }
      })
      .catch();
  }, []);
  if (Order !== null) {
    return (
      <div>
        <div className="progress">
          <div className="bar" style={{ width: `${progressValue}%` }}>
            {/* <p className="percent">15%</p> */}
          </div>
        </div>
        <div className="red-400">
          <MultiStepForm Order={Order} progress={progress} />
        </div>
      </div>
    );
  } else {
    return <div>No Order with this orderId</div>;
  }
}
