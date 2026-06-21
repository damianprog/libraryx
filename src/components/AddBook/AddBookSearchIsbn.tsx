import { Button } from "@mui/material";
import { useState } from "react";
import type { FormEvent, JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import getBookByIsbn from "../../apiUtils/getBookByIsbn";
import type { Book } from "../../types/Book";
import IsbnTextField from "./IsbnTextField";
import styles from "./addBookSearch.module.css";

const AddBookSearchIsbn = (): JSX.Element => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getBooks = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
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
    <form onSubmit={getBooks}>
      <IsbnTextField
        value={input}
        onChange={setInput}
        label="ISBN Number"
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <br />
      <div className={styles.buttons}>
        <Button type="submit" variant="text">
          Search with ISBN
        </Button>
        <Link to="/add-book">
          <Button type="button" variant="text">
            Add the book manually
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default AddBookSearchIsbn;
