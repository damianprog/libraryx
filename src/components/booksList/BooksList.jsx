import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import styles from "./booksList.module.css";

function BooksList({ books, showingUserBooks = false }) {
  const navigate = useNavigate();

  const getAuthors = (book) => {
    if (typeof book.authors === "string") {
      return book.authors;
    }

    const authors = book.authors.map((author) => {
      return `${author.firstname} ${author.lastname}`;
    });

    return authors.join(", ");
  };

  const onResultAdd = (book) => {
    navigate("/add-book", { state: book });
  };

  const handleResultsRowInfoClick = (book) => {
    if (showingUserBooks) {
      navigate("/user-book", { state: book });
    } else {
    }
  };

  return (
    <div className={styles.container}>
      {books.map((book) => (
        <div className={styles.resultsRow} key={book.id}>
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
              <p>{getAuthors(book)}</p>
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
      ))}
    </div>
  );
}

export default BooksList;
