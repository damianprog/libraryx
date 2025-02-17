import AddIcon from "@mui/icons-material/Add";
import styles from "./addBookSearchResults.module.css";

function AddBookSearchResults({ books }) {
  return (
    <div>
      {books.map((book) => (
        <div className={styles.resultsRow}>
          <div
            style={{
              backgroundImage: `url(${book.img})`,
            }}
            className={styles.resultsRowImg}
          ></div>
          <div className={styles.resultsRowInfo}>
            <div className={styles.resultRowDescriptions}>
              <p className={styles.descriptionsTitle}>{book.title}</p>
              <p>{book.authors}</p>
            </div>
            <div className={styles.resultsRowDate}>{book.publishedDate}</div>
            <div className={styles.resultsRowAdd}>
              <AddIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddBookSearchResults;
