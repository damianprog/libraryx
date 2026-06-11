import type { JSX } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";
import styles from "./booksList.module.css";

type BooksListProps = {
  books: Book[];
  showingUserBooks?: boolean;
};

function BooksList({ books, showingUserBooks = false }: BooksListProps): JSX.Element {
  const navigate = useNavigate();

  const handleResultsRowInfoClick = (book: Book): void => {
    if (showingUserBooks) {
      navigate("/user-book", { state: book });
    }
  };

  const onResultAdd = (book: Book): void => {
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
            {!showingUserBooks ? (
              <div className={styles.resultsRowAdd}>
                <AddIcon
                  onClick={() => {
                    onResultAdd(book);
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default BooksList;
