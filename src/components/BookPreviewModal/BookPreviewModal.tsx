import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { JSX } from "react";
import type { Book } from "../../types/Book";
import styles from "./bookPreviewModal.module.css";

type Props = {
  book: Book | null;
  onClose: () => void;
};

const BookPreviewModal = ({ book, onClose }: Props): JSX.Element => {
  return (
    <Modal open={book !== null} onClose={onClose}>
      <Box className={styles.modalBox}>
        <div className={styles.close}>
          <CloseIcon onClick={onClose} />
        </div>
        {book && (
          <div className={styles.content}>
            <img src={book.img} alt="book image" className={styles.img} />
            <div className={styles.info}>
              <h2>{book.title}</h2>
              <h3 className={styles.authors}>{book.authors}</h3>
              {book.categories && <p>Categories: {book.categories}</p>}
              {book.publishedDate && (
                <p>Published date: {book.publishedDate}</p>
              )}
              {book.publisher && <p>Publisher: {book.publisher}</p>}
              {book.pages && <p>{book.pages} pages</p>}
              {book.isbn && <p>ISBN: {book.isbn}</p>}
              {book.series && <p>Series: {book.series}</p>}
              {book.summary && <p>Summary: {book.summary}</p>}
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default BookPreviewModal;
