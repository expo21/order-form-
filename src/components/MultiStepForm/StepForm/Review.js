import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
export default function Review({ formData, navigation, progress }) {
  const { go } = navigation;
  useEffect(() => {
    progress(100);
  }, []);
  let step_3_details = [];

  if (
    formData.step_3.choose_style === "Custom Style" ||
    formData.step_2.garment_type === "Denim Jacket"
  ) {
    let custom_options = Object.keys(formData.step_3.custom).map((i) => {
      return { [i]: formData.step_3.custom[i] };
    });
    console.log(custom_options);
    step_3_details = [
      { Fitting: formData.step_3.fitting },
      { Fabric: formData.step_3.fabric },
      {
        Style:
          formData.step_2.garment_type === "Denim Jacket"
            ? "ReadyMade"
            : formData.step_3.choose_style,
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

  // if (formData.step_2.garment_type === "Denim Jacket") {
  //   step_3_details = [
  //     { Fitting: formData.step_3.fitting },
  //     { Fabric: formData.step_3.fabric },
  //     { "Style Number": formData.step_3.style_number },
  //     { "Thread Color": formData.step_3.thread_color },
  //     { "Leather Label": formData.step_3.leather_Label },
  //     { Button: formData.step_3.button },
  //     {
  //       "Special Instructions": formData.step_3.notes,
  //     },
  //   ];
  // }

  const { gender, name, email, address, Tel } = formData.step_1;
  const submitData = (formData) => {
    axios.post("http://localhost:3232/order", formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="review_wrapper">
      <h4 className="step_heading">Review your details</h4>
      <div className="review_wrapper-inner">
        <RenderAccordion
          summary="Step_1"
          go={go}
          details={[
            { date: new Date() },
            { Gender: gender },
            { Name: name },
            { Email: email },
            { Address: address },
            { Tel: Tel },
          ]}
        />
        <RenderAccordion
          summary="Step_2"
          go={go}
          details={[{ "Garment Type": formData.step_2.garment_type }]}
        />

        <RenderAccordion summary="Step_3" go={go} details={step_3_details} />
        <RenderAccordion
          summary="Step_4"
          go={go}
          details={Object.keys(formData.step_4).map((i) => {
            return { [i]: formData.step_4[i] };
          })}
        />
      </div>
      <div className="form_footer">
        <Button onClick={() => navigation.previous()}>Back</Button>

        <Button onClick={() => submitData(formData)}>Submit</Button>
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
