import React, { useState } from "react";

import "./App.css";

import Logo from "./logo.png";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminDashoard from "./pages/dashboard";
import OrderForm from "./pages/orderForm";

function App() {
  return (
    <Router>
      <div className="logo_wrapper">
        <a href="#">
          <img src={Logo} className="logo" />
        </a>
      </div>

      <Route exact path="/">
        <AdminDashoard />
      </Route>

      <Route path="/orderForm">
        <OrderForm />
      </Route>
    </Router>
  );
}

export default App;
// import React, { useState } from "react";

// import DataTable from "react-data-table-component";

// const data = [
//   { id: 1, title: "Conan the Barbarian", year: "1982" },
//   { id: 2, title: "Conan the Barbarian", year: "1982" },
//   { id: 3, title: "Conan the Barbarian", year: "1982" },
//   { id: 4, title: "Conan the Barbarian", year: "1982" },
//   { id: 5, title: "Conan the Barbarian", year: "1982" },
// ];

// const customStyles = {
//   rows: {
//     style: {
//       minHeight: "72px", // override the row height
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for head cells
//       paddingRight: "8px",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for data cells
//       paddingRight: "8px",
//     },
//   },
// };

// const columns = [
//   {
//     name: "ID",
//     selector: "id",
//     sortable: true,
//   },
//   {
//     name: "Title",
//     selector: "title",
//     sortable: true,
//   },
//   {
//     name: "Year",
//     selector: "year",
//     sortable: true,
//     right: true,
//   },
// ];

// export default class App extends React.Component {
//   render() {
//     return (
//       <DataTable
//         title="Arnold Movies"
//         columns={columns}
//         data={data}
//         customStyles={customStyles}
//       />
//     );
//   }
// }
