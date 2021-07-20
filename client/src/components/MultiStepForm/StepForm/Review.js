import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { updateOrder } from "../../../helper/helperFunctions";
export default function Review({ formData, navigation, progress }) {
  let history = useHistory();
  console.log({ review: formData });
  const { go } = navigation;
  useEffect(() => {
    progress(100);
  }, []);

  const editHandle = () => {
    history.push(`/app/order/${formData.step_1.order_number}`);
  };

  let step_3_details = [];
  var custom_options;
  if (
    formData.step_3.choose_style === "Custom Style" ||
    formData.step_2.garment_type === "Denim Jacket"
  ) {
    custom_options = Object.keys(formData.step_3.custom).map((i) => {
      return { [i]: formData.step_3.custom[i] };
    });

    step_3_details = [
      { Fitting: formData.step_3.fitting },
      { Fabric: formData.step_3.fabric },
      {
        Style: formData.step_3.choose_style,
      },

      ...custom_options,
    ];
  }

  if (formData.step_3.choose_style === "Ready Made Style") {
    step_3_details = [
      { Fitting: formData.step_3.fitting },
      { Fabric: formData.step_3.fabric },
      { Style: formData.step_3.choose_style },
      { "ReadyMade Style Number": formData.step_3.ready_style_number },
    ];
  }
  const { gender, name, email, address, tel } = formData.step_1;
  const submitData = (formData) => {
    if (formData.step_1.order_number) {
      updateOrder(formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post(`${window.APIPATH}/api/createOrder`, formData).then((res) => {
        console.log(res);
        if (res.data.status) {
          history.push("/app/orders/orderList");
        }
      });
    }
  };

  let d = new Date();
  let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  let stepDetails;
  if (formData.step_3.garment_style === "custom") {
    stepDetails = {
      ...formData.step_3,
      ...formData.ready_made,
      ...formData.custom,
    };
  } else {
    stepDetails = {
      ...formData.step_3,
      ...formData.ready_made,
      ready_style_number: formData.ready_style_number,
    };
  }

  console.log({ stepDetails });
  return (
    <div className="review_wrapper">
      <h4 className="step_heading">Review your details</h4>
      <div className="review_wrapper-inner">
        <RenderAccordion
          summary="Step_1"
          go={go}
          details={[
            { Date: date },
            { Gender: gender },
            { Name: name },
            { Email: email },
            { Address: address },
            { Tel: tel },
          ]}
        />
        <RenderAccordion
          summary="Step_2"
          go={go}
          details={[{ "Garment Type": formData.step_2.garment_type }]}
        />

        <RenderAccordion
          summary="Step_3"
          go={go}
          details={Object.keys(stepDetails).map((i) => {
            return { [i]: stepDetails[i] };
          })}
        />
        <RenderAccordion
          summary="Step_4"
          go={go}
          details={Object.keys(formData.step_4).map((i) => {
            return { [i]: formData.step_4[i] };
          })}
        />
      </div>
      <div className="step_form-wrapper">
        <div className="form_footer">
          <Button onClick={() => navigation.previous()}>Back</Button>

          <Button onClick={() => submitData(formData)}>
            {formData.step_1.order_number ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {summary}
    </AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return (
            <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
          );
        })}
        <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary.toLowerCase()}`)}
        >
          <EditIcon />
        </IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
);
