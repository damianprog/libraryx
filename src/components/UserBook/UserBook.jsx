import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./userBook.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import UserBookDeleteModal from "./UserBookDeleteModal";
import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const UserBook = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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

  useEffect(() => {
    if (state) {
      setBook(state);
    }
  }, []);

  const getAuthors = (book) => {
    if (typeof book.authors === "string") {
      return book.authors;
    }

    const authors = book.authors.map((author) => {
      return `${author.firstname} ${author.lastname}`;
    });

    return authors.join(", ");
  };

  const onUserBookDelete = async () => {
    try {
      const bookDoc = doc(db, "books", book.id);
      await deleteDoc(bookDoc);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.userBook}>
      <header className={styles.userBookHeader}>
        <div className={styles.container}>
          <div className={styles.headerMenu}>
            <div className={styles.headerLeftSide}>
              <Link className={styles.icon} to="/">
                <ArrowBackIcon />
              </Link>
              <h1>LibraryX</h1>
            </div>
            <div className={styles.headerRightSide}>
              <UserBookDeleteModal onUserBookDelete={onUserBookDelete} />
              <Link className={styles.icon} to="/">
                <EditIcon />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.userBookInfo}>
        <div className={styles.container}>
          <h2 className={styles.userBookInfoHeader}>{book.title}</h2>
          <h3 className={styles.userBookInfoAuthors}>{getAuthors(book)}</h3>
          {book.categories ? <p>Categories: {book.categories}</p> : ""}
          {book.publishedDate ? (
            <p>Published date: {book.publishedDate}</p>
          ) : (
            ""
          )}
          {book.publisher ? <p>Publisher: {book.publisher}</p> : ""}
          {book.pages ? <p>{book.pages} pages</p> : ""}
          {book.isbn ? <p>ISBN: {book.isbn}</p> : ""}
          {book.series ? <p>Series: {book.series}</p> : ""}
          {book.summary ? <p>Summary: {book.summary}</p> : ""}
          {book.notes ? <p>Notes: {book.notes}</p> : ""}
        </div>
      </div>
    </div>
  );
};

export default UserBook;
