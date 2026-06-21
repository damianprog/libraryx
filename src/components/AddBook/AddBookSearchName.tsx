import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import getBooksByName from "../../apiUtils/getBooksByName";
import BooksList from "../BooksList/BooksList";
import type { Book } from "../../types/Book";
import styles from "./addBookSearch.module.css";

const AddBookSearchName = (): JSX.Element => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const getBooks = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (input === "") {
      return;
    }
    setErrorMessage("");
    const foundBooks: Book[] | undefined = await getBooksByName(input);
    if (!foundBooks || foundBooks.length === 0) {
      setErrorMessage("No books found");
      return;
    }
    setFoundBooks(foundBooks);
    handleOpen();
  };

  return (
    <>
      <form onSubmit={getBooks}>
        <TextField
          className={styles.searchInput}
          label="Title, author, ..."
          variant="outlined"
          value={input}
          onChange={handleInputChange}
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <br />
        <div className={styles.buttons}>
          <Button type="submit" variant="text">
            Search
          </Button>
          <Link to="/add-book">
            <Button type="button" variant="text">
              Add the book manually
            </Button>
          </Link>
        </div>
      </form>
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
          <form className={styles.modalBoxSearch} onSubmit={getBooks}>
            <TextField
              className={styles.modalBoxSearchInput}
              label="Title, author, ..."
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="text">
              OK
            </Button>
          </form>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <BooksList<Book> books={foundBooks} />
        </Box>
      </Modal>
    </>
  );
};

export default AddBookSearchName;
