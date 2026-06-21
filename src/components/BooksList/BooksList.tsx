import { useState, type JSX } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";
import BookPreviewModal from "../BookPreviewModal/BookPreviewModal";
import styles from "./booksList.module.css";

type BooksListProps<T extends Book> = {
  books: T[];
  showingUserBooks?: boolean;
};

function BooksList<T extends Book>({
  books,
  showingUserBooks = false,
}: BooksListProps<T>): JSX.Element {
  const navigate = useNavigate();
  const [previewBook, setPreviewBook] = useState<T | null>(null);

  const handleResultsRowInfoClick = (book: T): void => {
    if (showingUserBooks) {
      navigate("/user-book", { state: book });
    } else {
      setPreviewBook(book);
    }
  };

  const onResultAdd = (book: T): void => {
    navigate("/add-book", { state: book });
  };

  return (
    <div className={styles.container}>
      {books.length === 0 ? (
        <p className={styles.noBooksInfo}>Sorry, nothing found</p>
      ) : (
        books.map((book, index) => (
          <div className={styles.resultsRow} key={`book${index}`}>
            <div
              className={styles.resultsRowInfo}
              onClick={() => handleResultsRowInfoClick(book)}
            >
              <div
                style={{
                  backgroundImage: `url(${book.img})`,
                }}
                className={styles.resultsRowImg}
              ></div>
              <div className={styles.resultRowDescriptions}>
                <p className={styles.descriptionsTitle}>{book.title}</p>
                <p>{book.authors}</p>
              </div>
              <div className={styles.resultsRowDate}>{book.publishedDate}</div>
            </div>
            {!showingUserBooks && (
              <div className={styles.resultsRowAdd}>
                <AddIcon
                  onClick={() => {
                    onResultAdd(book);
                  }}
                />
              </div>
            )}
          </div>
        ))
      )}
      {!showingUserBooks && (
        <BookPreviewModal
          book={previewBook}
          onClose={() => setPreviewBook(null)}
        />
      )}
    </div>
  );
}

export default BooksList;
