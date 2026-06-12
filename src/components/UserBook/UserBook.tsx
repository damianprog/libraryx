import { useEffect, useState, type JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import UserBookDeleteModal from "./UserBookDeleteModal";
import { db } from "../../config/firebase";
import type { UserBook as UserBookType } from "../../types/UserBook";
import styles from "./userBook.module.css";

const UserBook = (): JSX.Element | null => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [book, setBook] = useState<UserBookType | null>(null);

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }
    setBook(state as UserBookType);
  }, []);

  const onUserBookDelete = async (): Promise<void> => {
    if (!book) return;
    try {
      const bookDoc = doc(db, "books", book.id);
      await deleteDoc(bookDoc);
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const onEditClick = (): void => {
    navigate("/add-book", { state: book });
  };

  if (!book) return null;

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
              <EditIcon className={styles.editIcon} onClick={onEditClick} />
            </div>
          </div>
        </div>
      </header>
      <div className={styles.userBookContent}>
        <div className={styles.container}>
          <img src={book.img} alt="book image" className={styles.userBookImg} />
          <div className={styles.userBookInfo}>
            <h2>{book.title}</h2>
            <h3 className={styles.userBookInfoAuthors}>{book.authors}</h3>
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
    </div>
  );
};

export default UserBook;
