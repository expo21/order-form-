import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";

import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  addOption,
  getGarmentList,
  getGarmentStyleList,
  getStyleOptionsList,
  deleteStyleOption,
  updateOption,
} from "../../helper/helperFunctions";

const useStyles = makeStyles((theme) => ({
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const columns = [
  // {
  //   name: "_id",
  //   label: "ID",
  //   options: {
  //     filter: false,
  //     sort: false,
  //   },
  // },
  {
    name: "image",
    label: "Image",
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
    name: "input_type",
    label: "Input Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "garment_type",
    label: "Garment Types",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "style_option",
    label: "Garment Style",
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
  {
    name: "actions",
    label: "Action",
    options: {
      filter: false,
      sort: false,
    },
  },
];

export default function StyleOptions() {
  const classes = useStyles();

  //open Model
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setTitle("");
    setGarment_type([]);
    setInput_type("");
    setStyle_option("");
  };
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [input_type, setInput_type] = useState("");
  const [garment_type, setGarment_type] = useState([]);
  const [style_option, setStyle_option] = useState("");
  const [allGarments, setAllGarments] = useState([]);
  const [allStyleOptions, setAllStyleOptions] = useState([]);
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [editData, setEditData] = useState({});

  //Model end

  //table
  const [optionList, setOptionList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //table

  //submit data
  const handleSubmit = () => {
    const newOption = {
      title,
      input_type,
      garment_type,
      style_option,
      image,
    };
    const formData = new FormData();
    formData.append("image", newOption.image);
    formData.append("garment_type", newOption.garment_type);
    formData.append("title", newOption.title);
    formData.append("input_type", newOption.input_type);
    formData.append("style_option", newOption.style_option);
    if (
      formData.title === "" &&
      formData.garment_type.length === 0 &&
      formData.input_type === "" &&
      formData.style_option === "" &&
      formData.image === ""
    ) {
      setError("Please provide all details.");
    } else {
      setError("");
      if (editData._id) {
        editData.garment_type = newOption.garment_type;
        updateOption(editData)
          .then((res) => {
            handleClose();
            setState(!state);
          })
          .catch((error) => console.log(error));
      } else {
        addOption(formData)
          .then((response) => {
            handleClose();
            setState(true);
          })
          .catch((error) => console.log(error));
      }
    }
  };

  //open edit box
  const openEditBox = async (row) => {
    setEditData(row);
    setOpen(true);
    setTitle(row.title);
    setGarment_type(row.garment_type);
    setStyle_option(row.style_option._id);
    setInput_type(row.input_type);
  };

  //fetch all options
  const fetchAllOptions = () => {
    getStyleOptionsList()
      .then((response) => {
        if (response.length > 0) {
          setOptionList(response);
        } else setOptionList([]);
      })
      .catch((error) => console.log(error));
  };
  //fetch all style options
  const fetchAllStyleOptions = () => {
    getGarmentStyleList()
      .then((response) => {
        if (response.length > 0) {
          setAllStyleOptions(response);
        } else {
          setAllStyleOptions([]);
        }
      })
      .catch((error) => console.log(error));
  };
  //fetch all garments
  const fetchAllGarment = () => {
    getGarmentList()
      .then((response) => {
        if (response.length > 0) {
          setAllGarments(response);
        } else {
          setAllGarments([]);
        }
      })
      .catch((error) => console.log(error));
  };

  const printArray = (arr) => {
    return arr.map((x) => {
      if (x.style_option) {
        return <div key={x.title}>{x.title} </div>;
      } else {
        return (
          <div key={x.title}>
            {x.title} | {x.gender}
          </div>
        );
      }
    });
  };

  useEffect(() => {
    fetchAllOptions();
    fetchAllStyleOptions();
    fetchAllGarment();
    setState(false);
  }, [state]);

  //delete garment
  const optionDelete = (row) => {
    confirmAlert({
      title: "Confirm to delete. ",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteOption(row),
        },
        {
          label: "No",
          onClick: onclose,
        },
      ],
    });
  };

  const deleteOption = async (row) => {
    let response = await deleteStyleOption(row);
    if (response.status) {
      setState(!state);
    }
  };

  return (
    <>
      <PageTitle
        title="Options List"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleOpen}
          >
            Add New Option
          </Button>
        }
      />
      <Grid>
        {optionList.length > 0 ? (
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
                    {optionList
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

                              return (
                                <TableCell
                                  key={column.name}
                                  align={column.align}
                                  onClick={() => console.log(row)}
                                >
                                  {/* {Array.isArray(value)
                                  ? printArray(value)
                                  : column.name === "custom"
                                  ? printChooseStyle(value)
                                  : column.name === "status"
                                  ? printStatus(value)
                                  : value} */}

                                  {Array.isArray(value) ? (
                                    printArray(value)
                                  ) : typeof value === "object" ? (
                                    value.title
                                  ) : column.name === "image" ? (
                                    <Avatar
                                      alt={value}
                                      src={`${window.APIPATH}/uploads/${value}`}
                                    />
                                  ) : column.name === "actions" ? (
                                    <div>
                                      <IconButton
                                        onClick={() => openEditBox(row)}
                                        aria-label="edit"
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => optionDelete(row)}
                                        aria-label="delete"
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </div>
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={optionList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
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
              <h2 id="transition-modal-title">Add Option</h2>
              <div className={classes.titleModal}>
                <TextField
                  id="standard-basic"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                />
              </div>

              <div className={classes.titleModal}>
                <TextField
                  // id="outlined-select-currency"
                  select
                  label="Input Type"
                  name="input_type"
                  value={input_type}
                  helperText="Option Type"
                  variant="outlined"
                  // value={styleOption}
                  onChange={(e) => setInput_type(e.target.value)}
                >
                  {[
                    { label: "Radio", value: "radio" },
                    // { label: "Textbox", value: "text" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.titleModal}>
                <TextField
                  // id="outlined-select-currency"
                  select
                  label="Style Type"
                  name="style_option"
                  value={style_option}
                  helperText="Option Type"
                  variant="outlined"
                  // value={styleOption}
                  onChange={(e) => setStyle_option(e.target.value)}
                >
                  {allStyleOptions.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {editData._id
                ? editData.garment_type.map((x) => (
                    <p key={x.title}>
                      {x.title} | {x.gender}
                    </p>
                  ))
                : null}
              <div className={classes.titleSelect}>
                <InputLabel id="demo-mutiple-name-label">Garments</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={garment_type}
                  onChange={(e) => setGarment_type(e.target.value)}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {allGarments.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {`${item.title} | ${item.gender}`}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {editData._id ? null : (
                <div className={classes.titleFile}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
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
              )}
              <div>{error && <p>{error}</p>}</div>

              <div className={classes.titleButton}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {editData._id ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </Grid>
    </>
  );
}
