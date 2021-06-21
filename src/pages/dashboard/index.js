import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import ReportTable from "../../components/ReportTable/ReportTable";

export default function AdminDashoard() {
  const [data, setData] = useState([]);
  //get data from api
  useEffect(() => {
    axios.get("http://localhost:3232/order").then((res) => {
      console.log(res);
      if (res.status) {
        setData(res.data.data);
      }
    });
  }, []);

  // const data = [
  //   { id: 1, title: "Conan the Barbarian", year: "1982" },
  //   { id: 2, title: "Conan the Barbarian", year: "1982" },
  //   { id: 3, title: "Conan the Barbarian", year: "1982" },
  //   { id: 4, title: "Conan the Barbarian", year: "1982" },
  //   { id: 5, title: "Conan the Barbarian", year: "1982" },
  // ];

  // const columns = [
  //   {
  //     name: "Order Number",
  //     selector: "order_number",
  //     sortable: true,
  //   },
  //   // {
  //   //   name: "Name",
  //   //   selector: "email",
  //   //   sortable: true,
  //   // },
  //   // {
  //   //   name: "Title",
  //   //   selector: "title",
  //   //   sortable: true,
  //   // },
  //   // {
  //   //   name: "Year",
  //   //   selector: "year",
  //   //   sortable: true,
  //   //   right: true,
  //   // },
  // ];

  return (
    <div>
      <div>
        <Link to="/orderForm">create order</Link>
      </div>
      <div>
        <ReportTable data={data} />
      </div>
    </div>
  );
}
