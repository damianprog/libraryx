import { useState } from "react";
import type { JSX } from "react";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddBookSearchName from "../AddBook/AddBookSearchName";
import AddBookSearchIsbn from "../AddBook/AddBookSearchIsbn";
import styles from "./addBookModal.module.css";

const AddBookModal = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<"isbn" | "keyword">("isbn");

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <>
      <button onClick={handleOpen} className={styles.addButton}>
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
            onChange={(_, tab: "isbn" | "keyword") => setCurrentTab(tab)}
          >
            <Tab value="isbn" label="ISBN SEARCH" />
            <Tab value="keyword" label="KEYWORD SEARCH" />
          </Tabs>
          {currentTab === "isbn" ? <AddBookSearchIsbn /> : <AddBookSearchName />}
        </Box>
      </Modal>
    </>
  );
};

export default AddBookModal;
