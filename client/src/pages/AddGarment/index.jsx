import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PageTitle from "../../components/PageTitle/PageTitle";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import { mdiCookieSettingsOutline } from "@mdi/js";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import zIndex from "@material-ui/core/styles/zIndex";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getGarmentList,
  addGarment,
  deleteGarment,
} from "../../helper/helperFunctions";

const useStyles = makeStyles((theme) => ({
  form1: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
  },
  input: {
    display: "none",
  },

  titleModal: {
    "& > *": {
      width: "100%",
      margin: "0px 0px 20px 0px",
    },
  },
  titleSelect: {
    "& > *": {
      width: "100%",
      margin: "0px 0px 20px 0px",
    },
  },
  titleFile: {
    marginBottom: "20px",
    "& span": {
      padding: "20px",
      width: "100%",
      background: "#e6e6e6",
    },
    "& p": {
      color: "#000",
      zIndex: "1",
    },
  },

  titleButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  GarmentTabel: {
    width: "100%",
  },
}));

export default function AddGarment() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [state, setState] = useState("");

  const [newOption, setNewOption] = useState({
    title: "",
    gender: "",
    image: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newOption.image);
    formData.append("gender", newOption.gender);
    formData.append("title", newOption.title);

    if (
      newOption.title === "" &&
      newOption.gender === "" &&
      newOption.image === ""
    ) {
      setError("Please Provide all Details.");
    } else {
      setError("");
      addGarment(formData)
        .then((res) => {
          if (res) {
            handleClose();
            setState(true);
          }
        })
        .catch((err) => {
          console.log(err);
          handleClose();
        });
    }
  };

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const genders = [
    {
      value: "men",
      label: "Men",
    },
    {
      value: "women",
      label: "Women",
    },
  ];

  const [gender, setGender] = React.useState("men");

  const handleChangec = (event) => {
    setGender(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewOption({ ...newOption, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNewOption({ ...newOption, image: e.target.files[0] });
  };

  //fetch all garments
  const fetchGarmentLIst = async () => {
    try {
      const resultedData = await getGarmentList();
      if (resultedData.length > 0) {
        setTableData(resultedData);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  //Effects hooks
  useEffect(() => {
    fetchGarmentLIst();
  }, [state]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const printStatus = (value) => {
    if (value === 1) {
      return "Enable";
    } else {
      return "Disbale";
    }
  };

  // const onCellClick = (row) => {
  //   console.log(row);
  // };

  //delete garment
  const garmentDelete = (row) => {
    confirmAlert({
      title: "Confirm to delete. ",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteGarment(row),
        },
        {
          label: "No",
          onClick: onclose,
        },
      ],
    });
  };

  return (
    <>
      <PageTitle
        title="Grament List"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleOpen}
          >
            Add Garment
          </Button>
        }
      />
      {tableData.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.GarmentTabel}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.name];
                              console.log(value);
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  // onClick={() => onCellClick(row)}
                                >
                                  {column.name === "status" ? (
                                    printStatus(value)
                                  ) : column.name === "image" ? (
                                    <Avatar
                                      alt={value}
                                      src={`${window.APIPATH}/uploads/${value}`}
                                    />
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}

                            <div>
                              {/* <p onClick={() => deleteGarment(row)}>Edit</p>
                              <p onClick={() => garmentDelete(row)}>Delete</p> */}
                              <IconButton
                                onClick={() => deleteGarment(row)}
                                aria-label="edit"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => garmentDelete(row)}
                                aria-label="delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <div>There is no data please add some ...</div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add new Garment</h2>
            <div className={classes.titleModal}>
              <TextField
                id="standard-basic"
                label="Garment Title"
                name="title"
                value={newOption.title}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <div className={classes.titleSelect}>
              <TextField
                // id="outlined-select-currency"
                select
                label="Select Gender"
                name="gender"
                value={gender}
                onChange={handleChangec}
                helperText="Please select gender."
                variant="outlined"
                value={newOption.gender}
                onChange={handleChange}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.titleFile}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                name="image"
                onChange={handleImage}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="raised"
                  component="span"
                  className={classes.button}
                >
                  <p>Upload</p>
                </Button>
              </label>
            </div>
            <p>{error}</p>
            <div className={classes.titleButton}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
