import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle";

// data
import { getOrderList } from "../../helper/helperFunctions";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

const columnsz = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "company",
    label: "Company",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "state",
    label: "State",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];

export default function OrderList() {
  function flattenObject(ob) {
    const toReturn = {};

    Object.keys(ob).map((i) => {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        const flatObject = flattenObject(ob[i]);
        Object.keys(flatObject).map((x) => {
          toReturn[`${i}.${x}`] = flatObject[x];
          return x;
        });
      } else {
        toReturn[i] = ob[i];
      }
      return i;
    });

    return toReturn;
  }

  let [columns, setColumns] = useState([]);

  let [apiData, setApiData] = useState([]);
  let history = useHistory();
  const fetchData = () => {
    getOrderList()
      .then((response) => {
        // let sortedData = data.map((item) => flattenObject(item));

        // columns = Object.keys(data[0]).map((item) => item);
        console.log(response);
        let resp = { ...response, ...response.custom, ...response.ready_made };
        console.log(resp);

        console.log(
          Object.keys(response[0])
            .map((item) => item)
            .map((obj) => {
              console.log(typeof response[0][obj] === "string");

              if (typeof response[0][obj] === "string") {
                return {
                  name: obj,
                  label: obj.charAt(0).toUpperCase() + obj.slice(1),
                  options: {
                    filter: true,
                    sort: true,
                  },
                };
              }
            })
        );

        setColumns(
          Object.keys(response[0])
            .map((item) => item)
            .map((obj) => {
              console.log(typeof response[0][obj] === "string");

              if (typeof response[0][obj] === "string") {
                return {
                  name: obj,
                  label: obj.charAt(0).toUpperCase() + obj.slice(1),
                  options: {
                    filter: true,
                    sort: true,
                  },
                };
              } else {
                return;
              }
            })
            .filter((obj) => obj !== undefined)
        );
        setApiData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  console.log(apiData);
  return (
    <>
      <PageTitle title="Orders List" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Order List"
            data={apiData}
            columns={columns}
            options={{
              filterType: "multiselect",
              print: false,
              download: false,
              // filterType: "checkbox",
              onRowClick: (rowData, rowMeta) => {
                history.push(`/app/order/${rowData[0]}`);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
