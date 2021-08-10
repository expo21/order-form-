import React from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function ConfirmationBox({
  openDeleteModal,
  handleClose,
  deleteFunction,
}) {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDeleteModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={openDeleteModal}>
          <div>
            <div
              style={{
                width: "400px",
                padding: "30px",
                textAlign: "left",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: " 0 20px 75px rgb(0 0 0 / 13%)",
                color: "#666",
              }}
            >
              <h2>Confirm to delete.</h2>
              Are you sure to do this.
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "20px",
                }}
              >
                <button
                  style={{
                    outline: "none",
                    background: "#333",
                    border: "none",
                    display: "inline-block",
                    padding: "6px 18px",
                    color: "#eee",
                    marginRight: "10px",
                    borderRadius: " 5px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={deleteFunction}
                >
                  Yes
                </button>
                <button
                  style={{
                    outline: "none",
                    background: "#333",
                    border: "none",
                    display: "inline-block",
                    padding: "6px 18px",
                    color: "#eee",
                    marginRight: "10px",
                    borderRadius: " 5px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
