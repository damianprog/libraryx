import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import styles from "./addBookModal.module.css";
import AddBookSearchName from "../AddBook/AddBookSearchName";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import AddBookSearchIsbn from "../AddBook/AddBookSearchIsbn";

function AddBookModal({ modalContent }) {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("isbn");
  const handleOpen = () => setOpen(true);
  const handleClose = (_, reason) => {
    // if (reason !== "backdropClick") {
    setOpen(false);
    // }
  };

  const handleTabChange = (event, tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
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
        hideBackdrop={true}
      >
        <Box className={styles.modalBox}>
          <div className={styles.modalBoxClose}>
            <CloseIcon onClick={handleClose} />
          </div>
          <Tabs
            className={styles.tabs}
            value={currentTab}
            onChange={handleTabChange}
          >
            <Tab value="isbn" label="ISBN SEARCH" />
            <Tab value="keyword" label="KEYWORD SEARCH" />
          </Tabs>
          {currentTab === "isbn" ? (
            <AddBookSearchIsbn />
          ) : (
            <AddBookSearchName />
          )}
        </Box>
      </Modal>
    </>
  );
}

export default AddBookModal;
