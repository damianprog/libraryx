import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import getBooksByName from "../../apiUtils/getBooksByName";
import styles from "./addBookSearchName.module.css";
import AddBookSearchResults from "./AddBookSearchResults";

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

      console.log(foundBooks);
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
        <Button variant="text">Add the book manually</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalBox}>
            <AddBookSearchResults books={foundBooks} />
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default AddBookSearchName;
