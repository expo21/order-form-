import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import OrderForm from "../../pages/OrderForm/OrderForm";
import OrderList from "../../pages/OrderList/OrderList";
import AddGarment from "../../pages/AddGarment";

import GarmentStyle from "../../pages/GarmentStyle";
import StyleOptions from "../../pages/StyleOptions/index.jsx";
import OrderDetails from "../../pages/OrderDetails/OrderDetails";
import Setting from "../../pages/Setting/Setting";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/orders/createOrder" component={OrderForm} />

            <Route path="/app/orders/orderList" component={OrderList} />
            <Route path="/app/order/:orderNumber" component={OrderDetails} />
            <Route path="/app/garmentTypes" component={AddGarment} />
            {/* <Route path="/app/garments/garmentList" component={Tables} /> */}
            <Route path="/app/styles" component={GarmentStyle} />
            <Route path="/app/options" component={StyleOptions} />
            <Route path="/app/setting" component={Setting} />
            <Route path="/app/orders" component={Tables} />

            {/* <Route path="/app/orders/orderList" component={Tables} /> */}

            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              <Link
                color={"primary"}
                href={"https://www.brownbeardenim.com/"}
                target={"_blank"}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={"primary"}
                href={"https://www.brownbeardenim.com/"}
                target={"_blank"}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link href={"https://www.brownbeardenim.com/"} target={"_blank"}>
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://www.brownbeardenim.com/"} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://www.brownbeardenim.com/"} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
