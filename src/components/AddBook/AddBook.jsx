import { Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./addBook.module.css";
import { collection, addDoc, doc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

const AddBook = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    authors: [{ firstname: "", lastname: "" }],
    publishedDate: "",
    categories: "",
    isbn: "",
    img: "",
    publisher: "",
    pages: "",
    series: "",
    volume: "",
    summary: "",
    userId: "",
  });

  const booksCollectionRef = useMemo(() => collection(db, "books"), []);

  useEffect(() => {
    if (state) {
      setBook(state);
    }
  }, []);

  const addAuthorRow = () => {
    let isAnyRowEmpty = false;

    book.authors.forEach((author) => {
      if (author.firstname.trim() === "" && author.lastname.trim() === "") {
        isAnyRowEmpty = true;
      }
    });

    if (!isAnyRowEmpty) {
      setBook({
        ...book,
        authors: [...book.authors, { firstname: "", lastname: "" }],
      });
    }
  };

  const removeAuthorRow = (index) => {
    setBook({
      ...book,
      authors: [...book.authors.toSpliced(index, 1)],
    });
  };

  const handleInputChange = (event, inputName) => {
    setBook({
      ...book,
      [inputName]: event.target.value,
    });
  };

  const handleAuthorNameChange = (event, index) => {
    const bookCopy = { ...book };
    bookCopy.authors[index].firstname = event.target.value;

    setBook(bookCopy);
  };

  const onSubmitBook = async () => {
    const authorsNames = book.authors.map((author) => {
      return `${author.firstname} ${author.lastname}`;
    });

    try {
      await addDoc(booksCollectionRef, {
        ...book,
        authors: authorsNames.join(", "),
        userId: auth.currentUser.uid,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.addBook}>
      <header className={styles.addBookHeader}>
        <div className={styles.container}>
          <Link className={styles.backIcon} to="/">
            <ArrowBackIcon />
          </Link>
          <h1>LibraryX</h1>
        </div>
      </header>
      <div className={styles.addBookInputs}>
        <div className={styles.container}>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Title"
              variant="outlined"
              value={book.title ? book.title : ""}
              onChange={(event) => handleInputChange(event, "title")}
            />
          </div>
          {book.authors.map((author, index) => {
            return (
              <div className={styles.addBookInputsRow} key={`author${index}`}>
                <TextField
                  className={styles.input}
                  label="Firstname"
                  variant="outlined"
                  value={author.firstname}
                  onChange={(event) => handleAuthorNameChange(event, index)}
                />
                <TextField
                  className={styles.input}
                  label="Lastname"
                  variant="outlined"
                  value={author.lastname}
                />
                {index === 0 ? (
                  <AddIcon
                    className={styles.authorRowIcon}
                    onClick={addAuthorRow}
                  />
                ) : (
                  <RemoveIcon
                    className={styles.authorRowIcon}
                    onClick={() => removeAuthorRow(index)}
                  />
                )}
              </div>
            );
          })}
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Summary"
              variant="outlined"
              multiline
              rows={2}
              value={book.summary ? book.summary : ""}
              onChange={(event) => handleInputChange(event, "summary")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Series"
              variant="outlined"
              value={book.series ? book.series : ""}
              onChange={(event) => handleInputChange(event, "series")}
            />
            <TextField
              className={styles.input}
              label="Volume"
              variant="outlined"
              value={book.volume ? book.volume : ""}
              onChange={(event) => handleInputChange(event, "volume")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Category"
              variant="outlined"
              onChange={(event) => handleInputChange(event, "category")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Published date"
              variant="outlined"
              value={book.publishedDate ? book.publishedDate : ""}
              onChange={(event) => handleInputChange(event, "publishedDate")}
            />
            <TextField
              className={styles.input}
              label="Publisher"
              variant="outlined"
              value={book.publisher ? book.publisher : ""}
              onChange={(event) => handleInputChange(event, "publisher")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Pages"
              variant="outlined"
              value={book.pages ? book.pages : ""}
              onChange={(event) => handleInputChange(event, "pages")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="ISBN"
              variant="outlined"
              value={book.isbn ? book.isbn : ""}
              onChange={(event) => handleInputChange(event, "isbn")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <Button
              className={styles.addButton}
              variant="contained"
              onClick={onSubmitBook}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
