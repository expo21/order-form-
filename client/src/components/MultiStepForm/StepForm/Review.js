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
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ formData, setForm, navigation, progress }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedC: true,
  });

  const handleChangeSelect = (event) => {
    setForm(event);
  };

  let history = useHistory();
  const { go } = navigation;
  useEffect(() => {
    progress(100);
  }, []);

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
          if (res) {
            history.push("/app/orders/orderList");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post(`${window.APIPATH}/api/createOrder`, formData).then((res) => {
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
      {formData.step_1.order_number && (
        <>
          {/* <div className="switchSec">
            <FormGroup>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Deactive</Grid>
                  <Grid item>
                    <AntSwitch
                      checked={formData.status == 1}
                      onChange={handleChangeSwitch}
                      name="status"
                      value={formData.status}
                    />
                  </Grid>
                  <Grid item>Active</Grid>
                </Grid>
              </Typography>
            </FormGroup>
          </div> */}

          <div className="bookSta">
            <label>
              Booking Status:{" "}
              <span>
                {formData.booking == 2
                  ? "Approved"
                  : formData.booking == 3
                  ? "Completed"
                  : "Pending"}
              </span>
            </label>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Booking
              </InputLabel>
              <Select
                native
                name="booking"
                value={formData.booking}
                onChange={handleChangeSelect}
                label="Booking"
              >
                <option value={1}>Pending</option>
                <option value={2}>Approved</option>
                <option value={3}>Completed</option>
              </Select>
            </FormControl>
          </div>
        </>
      )}

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
