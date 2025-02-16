import * as React from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import styles from "./addBookModal.module.css";
import AddBookSearchName from "../AddBook/AddBookSearchName";

export default function AddBookModal({ modalContent }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className={styles.addButton}
        variant="contained"
        color="amber"
      >
        <AddIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalBox}>
          <AddBookSearchName />
        </Box>
      </Modal>
    </div>
  );
}
