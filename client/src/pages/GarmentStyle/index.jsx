import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
  getGarmentStyleList,
  getGarmentList,
  addStyleOption,
  updateStyleOption,
  deleteStyle,
} from "../../helper/helperFunctions";

import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import ConfirmationBox from "../../components/ConfirmationBox/confirmationBox";
import Spinner from "../../components/Loader/index";

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
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
    height: "500px",
    overflow: "auto",
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
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "custom",
    label: "Style Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "garment_type",
    label: "Garment Type",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "options",
    label: "Options",
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
    name: "action",
    label: "Action",
    options: {
      filter: false,
      sort: false,
    },
  },
];

export default function GarmentStyle() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [garmentList, setGarmentList] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [styleType, setStyleType] = useState(0);
  const [styleList, setStyleList] = useState([]);
  const [state, setState] = useState(false);

  const [editData, setEditData] = useState({});

  const [selectedItem, setSelectedItem] = useState({});
  const [openDeleteModal, setDeleteModal] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError("");
    setOpen(false);
    setEditData({});
    setTitle("");
    setSelectedGarments([]);
    setStyleType(0);
    setDeleteModal(false);
    setSelectedItem({});
  };

  //delete garment
  const styleDelete = (row) => {
    setDeleteModal(true);
    setSelectedItem(row);
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setSelectedGarments(event.target.value);
  };
  const history = useHistory();
  const handleSubmit = () => {
    let formData = {
      title: title,
      garment_type: selectedGarments,
      custom: styleType,
    };

    if (formData.title === "" && formData.garment_type.length === 0) {
      setError("Please provide all details.");
    } else {
      setError("");
      setLoading(true);
      if (editData._id) {
        editData.title = title;
        editData.custom = styleType;
        editData.garment_types = selectedGarments;

        updateStyleOption(editData).then((response) => {
          if (response.data.status) {
            handleClose();
            setState(!state);
            setLoading(false);
          }
        });
      } else {
        addStyleOption(formData)
          .then((response) => {
            if (response) {
              handleClose();
              setState(!state);
              setSelectedGarments([]);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    }
  };
  const fetchStyleLIst = async () => {
    try {
      let resultedData = await getGarmentStyleList();

      if (resultedData !== undefined) {
        console.log({ resultedData });
        setStyleList(resultedData);
        setLoading(false);
      } else {
        setLoading(false);
        setStyleList([]);
      }
    } catch (error) {}
  };

  const fetchGarmentLIst = async () => {
    try {
      let resultedData = await getGarmentList();
      if (resultedData.length > 0) {
        setGarmentList(resultedData);
      } else {
        setGarmentList([]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    fetchStyleLIst();
    fetchGarmentLIst();
  }, [state]);

  const deleteFunction = async (row) => {
    setLoading(true);
    let response = await deleteStyle(row);
    if (response.status) {
      setDeleteModal(false);
      setState(!state);
      setLoading(false);
    }
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

  const printChooseStyle = (number) => {
    if (number === 0) {
      return "ReadyMade";
    } else {
      return "Custom";
    }
  };

  const printStatus = (value) => {
    console.log({ value });
    if (value == 1) {
      return "Enable";
    } else {
      return "Disbale";
    }
  };

  const openEditBox = (row) => {
    setEditData(row);
    setOpen(true);
    setTitle(row.title);
    setStyleType(row.custom);
  };
  return (
    <>
      <PageTitle
        title="Style List"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleOpen}
          >
            Add Style
          </Button>
        }
      />
      {loading && <Spinner />}
      <Grid>
        {styleList.length > 0 ? (
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
                    {styleList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        console.log({ row });
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
                                  onClick={() => console.log(row, "sdiyfg")}
                                >
                                  {Array.isArray(value) ? (
                                    printArray(value)
                                  ) : column.name === "custom" ? (
                                    printChooseStyle(value)
                                  ) : column.name === "status" ? (
                                    // console.log(value);
                                    // printStatus(value)
                                    value
                                  ) : column.name === "action" ? (
                                    <div>
                                      <IconButton
                                        onClick={() => openEditBox(row)}
                                        aria-label="edit"
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => styleDelete(row)}
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
                count={styleList.length}
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

        <ConfirmationBox
          deleteFunction={() => deleteFunction(selectedItem)}
          openDeleteModal={openDeleteModal}
          handleClose={handleClose}
        />
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
              <h2 id="transition-modal-title">Add new Garment Style</h2>
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

              <div className={classes.titleSelect}>
                <TextField
                  // id="outlined-select-currency"
                  select
                  label="Style Type"
                  name="styleType"
                  value={styleType}
                  helperText="Select Style Type."
                  variant="outlined"
                  // value={styleOption}
                  onChange={(e) => setStyleType(e.target.value)}
                >
                  {[
                    { label: "Ready Made", value: 0 },
                    { label: "custom", value: 1 },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.titleSelect}>
                <InputLabel id="demo-mutiple-name-label">Garments</InputLabel>
                {editData._id
                  ? editData.garment_type.map((x) => (
                      <p key={x.title}>
                        {x.title} | {x.gender}
                      </p>
                    ))
                  : null}
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={selectedGarments}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                  variant="outlined"
                  placeholder="Select Garment Type."
                >
                  {garmentList.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {`${item.title} | ${item.gender} `}
                    </MenuItem>
                  ))}
                </Select>
              </div>
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
