import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type JSX,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./addBook.module.css";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import bookPlaceholder from "../../assets/book-placeholder.svg";
import type { UserBook } from "../../types/UserBook";

type AddBookFormState = Omit<UserBook, "id" | "userId" | "createdAt"> &
  Partial<Pick<UserBook, "id" | "userId">>;

const AddBook = (): JSX.Element => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState<AddBookFormState>({
    title: "",
    authors: "",
    publishedDate: "",
    categories: "",
    isbn: "",
    img: bookPlaceholder,
    publisher: "",
    pages: "",
    series: "",
    volume: "",
    summary: "",
    notes: "",
    isRead: false,
    readStartDate: "",
    readEndDate: "",
  });

  const booksCollectionRef = useMemo(() => collection(db, "books"), []);

  useEffect(() => {
    if (state) {
      const { createdAt, ...rest } = state as UserBook;
      setBook((prev) => ({ ...prev, ...rest }));
    }
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: Exclude<keyof AddBookFormState, "isRead" | "id" | "userId">,
  ): void => {
    setBook({
      ...book,
      [inputName]: event.target.value,
    });
  };

  const handleIsReadChange = (): void => {
    setBook({
      ...book,
      readEndDate: book.isRead ? "" : book.readEndDate,
      isRead: !book.isRead,
    });
  };

  const updateBook = async (): Promise<void> => {
    if (!book.id) return;
    const bookDoc = doc(db, "books", book.id);
    await updateDoc(bookDoc, book);
  };

  const createBook = async (): Promise<void> => {
    if (!user) return;
    await addDoc(booksCollectionRef, {
      ...book,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  };

  const onSubmitBook = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      if (book.id) {
        await updateBook();
      } else {
        await createBook();
      }

      navigate("/");
    } catch (err: unknown) {
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
      <form
        className={styles.addBookForm}
        onSubmit={onSubmitBook}
      >
        <div className={styles.container}>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Title"
              variant="outlined"
              value={book.title}
              onChange={(event) => handleInputChange(event, "title")}
              required
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Authors"
              variant="outlined"
              value={book.authors}
              onChange={(event) => handleInputChange(event, "authors")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Summary"
              variant="outlined"
              multiline
              rows={2}
              value={book.summary}
              onChange={(event) => handleInputChange(event, "summary")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Notes"
              variant="outlined"
              value={book.notes}
              onChange={(event) => handleInputChange(event, "notes")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={book.isRead}
                    onChange={handleIsReadChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Read"
              />
            </FormGroup>
            <div className={styles.readDates}>
              <div>
                <p>Start date</p>
                <input
                  type="date"
                  value={book.readStartDate}
                  className={styles.dateInput}
                  onChange={(event) =>
                    handleInputChange(event, "readStartDate")
                  }
                />
              </div>
              <div>
                {book.isRead ? (
                  <>
                    <p>End date</p>
                    <input
                      type="date"
                      value={book.readEndDate}
                      className={styles.dateInput}
                      onChange={(event) =>
                        handleInputChange(event, "readEndDate")
                      }
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Series"
              variant="outlined"
              value={book.series}
              onChange={(event) => handleInputChange(event, "series")}
            />
            <TextField
              className={styles.input}
              label="Volume"
              variant="outlined"
              value={book.volume}
              onChange={(event) => handleInputChange(event, "volume")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Categories"
              variant="outlined"
              value={book.categories}
              onChange={(event) => handleInputChange(event, "categories")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Published date"
              variant="outlined"
              value={book.publishedDate}
              onChange={(event) => handleInputChange(event, "publishedDate")}
            />
            <TextField
              className={styles.input}
              label="Publisher"
              variant="outlined"
              value={book.publisher}
              onChange={(event) => handleInputChange(event, "publisher")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="Pages"
              variant="outlined"
              value={book.pages}
              onChange={(event) => handleInputChange(event, "pages")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <TextField
              className={styles.input}
              label="ISBN"
              variant="outlined"
              value={book.isbn}
              onChange={(event) => handleInputChange(event, "isbn")}
            />
          </div>
          <div className={styles.addBookInputsRow}>
            <Button
              className={styles.addButton}
              variant="contained"
              type="submit"
            >
              OK
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
