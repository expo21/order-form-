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
  console.log(navigation);
  const { name, Address, email, Tel, gender } = formData;
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
            { Address: Address },
            { Tel: Tel },
          ]}
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
