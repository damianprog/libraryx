import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getBookByIsbn from "../../apiUtils/getBookByIsbn";
import styles from "./addBookSearch.module.css";

const AddBookSearchIsbn = () => {
  const [input, setInput] = useState("");
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => setInput(event.target.value);

  async function getBooks() {
    if (input !== "") {
      let foundBook = await getBookByIsbn(input);
      foundBook = foundBook ? foundBook : {};

      console.log(foundBook);

      setBook(foundBook);

      navigate("/add-book", { state: foundBook });
    }
  }

  return (
    <>
      <TextField
        className={styles.searchInput}
        label="ISBN Number"
        variant="outlined"
        value={input}
        onChange={handleInputChange}
      />
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
