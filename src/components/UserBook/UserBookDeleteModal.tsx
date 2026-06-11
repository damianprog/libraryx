import { useState, type JSX } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal } from "@mui/material";
import styles from "./userBookDeleteModal.module.css";

type UserBookDeleteModalProps = {
  onUserBookDelete: () => void;
};

const UserBookDeleteModal = ({
  onUserBookDelete,
}: UserBookDeleteModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <DeleteIcon onClick={handleOpen} className={styles.deleteIcon} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box className={styles.modalBox}>
          <div className={styles.modalBoxClose}>
            <CloseIcon onClick={handleClose} />
          </div>
          <div>
            <p className={styles.modalBoxPrompt}>
              Are you sure you want to delete this book?
            </p>
            <div className={styles.modalBoxButtons}>
              <Button variant="text" onClick={onUserBookDelete}>
                Yes
              </Button>
              <Button variant="text" onClick={handleClose}>
                No
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserBookDeleteModal;
