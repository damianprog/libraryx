import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import getBooksByName from "../../apiUtils/getBooksByName";
import styles from "./addBookSearch.module.css";
import BooksList from "../BooksList/BooksList";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function AddBookSearchName() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [foundBooks, setFoundBooks] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleClose = (_, reason) => {
    // if (reason !== "backdropClick") {
    setOpen(false);
    // }
  };

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  async function getBooks() {
    if (input !== "") {
      let foundBooks = await getBooksByName(input);
      foundBooks = foundBooks ? foundBooks : [];

      setFoundBooks(foundBooks);

      handleOpen();
    }
  }

  return (
    <>
      <TextField
        className={styles.searchInput}
        label="Title, author, ..."
        variant="outlined"
        value={input}
        onChange={handleInputChange}
      />
      <br />
      <div className={styles.buttons}>
        <Button onClick={getBooks} variant="text">
          Search
        </Button>
        <Link to="/add-book">
          <Button variant="text">Add the book manually</Button>
        </Link>
      </div>
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
          <div className={styles.modalBoxSearch}>
            <TextField
              className={styles.modalBoxSearchInput}
              label="Title, author, ..."
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
            <button onClick={getBooks} variant="text">
              OK
            </button>
          </div>
          <BooksList books={foundBooks} />
        </Box>
      </Modal>
    </>
  );
}

export default AddBookSearchName;
