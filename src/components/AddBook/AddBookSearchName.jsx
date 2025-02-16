import { Button, TextField } from "@mui/material";
import { useState } from "react";
import getBooksByName from "../../apiUtils/getBooksByName";
import styles from "./addBookSearchName.module.css";

function AddBookSearchName() {
  const [input, setInput] = useState("");

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  async function getBooks() {
    if (input !== "") {
      let foundBooks = await getBooksByName(input);
      foundBooks = foundBooks ? foundBooks : [];

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
      </div>
    </>
  );
}

export default AddBookSearchName;
