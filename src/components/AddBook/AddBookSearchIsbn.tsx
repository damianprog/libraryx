import { Button, TextField } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent, JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import getBookByIsbn from "../../apiUtils/getBookByIsbn";
import type { Book } from "../../types/Book";
import styles from "./addBookSearch.module.css";

const AddBookSearchIsbn = (): JSX.Element => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getBooks = async (): Promise<void> => {
    if (input === "") {
      return;
    }
    setErrorMessage("");
    const foundBook: Book | undefined = await getBookByIsbn(input);
    if (!foundBook) {
      setErrorMessage("No book found with this ISBN");
      return;
    }
    navigate("/add-book", { state: foundBook });
  };

  return (
    <>
      <TextField
        className={styles.searchInput}
        label="ISBN Number"
        variant="outlined"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <br />
      <div className={styles.buttons}>
        <Button onClick={getBooks} variant="text">
          Search with ISBN
        </Button>
        <Link to="/add-book">
          <Button variant="text">Add the book manually</Button>
        </Link>
      </div>
    </>
  );
};

export default AddBookSearchIsbn;
