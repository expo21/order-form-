import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// components;
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#536DFE",
    color: "#fff",
    position: "relative",
    padding: "10px",
  },
  root2: {
    display: "flex",
    background: "#1de9b6",
    color: "#fff",
    position: "relative",
    padding: "10px",
  },
  root3: {
    display: "flex",
    background: "#f44236",
    color: "#fff",
    position: "relative",
    padding: "10px",
  },
  root4: {
    display: "flex",
    background: "#1dc4e9",
    color: "#fff",
    position: "relative",
    padding: "10px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  icon: {
    position: "absolute",
    right: "0",
    "& .MuiSvgIcon-root": {
      fontSize: "7rem",
    },
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  var theme = useTheme();

  // local;
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      <PageTitle
        title="Dashboard"
        button={
          <Button variant="contained" size="medium" color="secondary">
            Latest Reports
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Total Orders
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  1234
                </Typography>
              </CardContent>
            </div>
            <div className={classes.icon}>
              <ShoppingCartIcon />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root2}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Approved Orders
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  1234
                </Typography>
              </CardContent>
            </div>
            <div className={classes.icon}>
              <CheckCircleIcon />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root3}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Pending Orders
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  1234
                </Typography>
              </CardContent>
            </div>
            <div className={classes.icon}>
              <HelpIcon />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root4}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Completed Orders
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  1234
                </Typography>
              </CardContent>
            </div>
            <div className={classes.icon}>
              <CheckCircleIcon />
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
