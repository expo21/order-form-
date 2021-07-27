import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

function Sidebar({ location }) {
  var structure = [];
  let token = localStorage.getItem("auth-token");

  var isAdmin = { userType: 2 };
  if (token !== null) {
    isAdmin = JSON.parse(atob(token.split(".")[1]));
  }

  if (isAdmin?.userType === 1) {
    structure = [
      { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
      {
        id: 1,
        label: "Orders",
        link: "/app/orders",
        icon: <TableIcon />,
        children: [
          { label: "Create Order", link: "/app/orders/createOrder" },
          { label: "Order List", link: "/app/orders/orderList" },
        ],
      },
      {
        id: 2,
        label: "Garment Types",
        link: "/app/garmentTypes",
        icon: <TableIcon />,
        // children: [
        //   { label: "Add Garment", link: "/app/garments/addGarment" },
        //   { label: "Garment List", link: "/app/garments/garmentList" },

        // ],
      },
      {
        id: 3,
        label: "Styles",
        link: "/app/styles",
        icon: <TableIcon />,
        // children: [
        //   { label: "Add Style", link: "/app/styles/addStyle" },
        //   { label: "Style List", link: "/app/styles/styleList" },
        //   // { label: "Maps", link: "/app/ui/maps" },
        // ],
      },
      {
        id: 4,
        label: "Options",
        link: "/app/options",
        icon: <UIElementsIcon />,
      },
      { id: 5, label: "Setting", link: "/app/setting", icon: <HomeIcon /> },
    ];
  } else {
    structure = [
      { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
      {
        id: 1,
        label: "Orders",
        link: "/app/orders",
        icon: <TableIcon />,
        children: [
          { label: "Create Order", link: "/app/orders/createOrder" },
          { label: "Order List", link: "/app/orders/orderList" },
        ],
      },
      { id: 2, label: "Setting", link: "/app/setting", icon: <HomeIcon /> },
    ];
  }

  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
