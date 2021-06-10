import React from "react";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

export default function Review({ formData, navigation }) {
  const { go } = navigation;

  const { step_3 } = formData;
  // console.log(Object.keys(step_3).map((i) => {}));

  let step_3_details = [];
  if (
    formData.step_3.choose_style === "Custom Style" ||
    formData.garment_type === "Denim Jacket"
  ) {
    let custom_options = Object.keys(formData.step_3.custom).map((i) => {
      return { [i]: formData.step_3.custom[i] };
    });
    console.log("hfgjsgfjsgfjsfg");
    step_3_details = [
      { Fitting: formData.step_3.fitting },
      { Fabric: formData.step_3.fabric },
      { Style: formData.step_3.choose_style },
      ...custom_options,
      // { "ReadyMade Style Number": formData.step_3.ready_style_number },
    ];
    console.log(step_3_details);
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
    console.log(formData);
  };

  return (
    <div>
      review..
      <div style={{ marginTop: "1rem" }}>
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

        {/* <RenderAccordion
          summary="Address"
          go={go}
          details={[
            { Address: address },
            { City: city },
            { State: state },
            { Zip: zip },
          ]}
        />
        <RenderAccordion
          summary="Contact"
          go={go}
          details={[{ Phone: phone }, { Email: email }]}
        /> */}
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
          onClick={() => submitData(formData)}
        >
          Submit
        </Button>
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
