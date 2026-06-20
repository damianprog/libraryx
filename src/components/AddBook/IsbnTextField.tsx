import { Button, TextField } from "@mui/material";
import type { JSX } from "react";
import styles from "./isbnTextField.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const IsbnTextField = ({
  value,
  onChange,
  label = "ISBN",
}: Props): JSX.Element => {
  return (
    <div className={styles.isbnField}>
      <TextField
        className={styles.input}
        label={label}
        variant="outlined"
        value={value}
        slotProps={{ htmlInput: { inputMode: "numeric" } }}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.extraChars}>
        <Button onClick={() => onChange(value + "X")} variant="outlined">
          X
        </Button>
        <Button onClick={() => onChange(value + "-")} variant="outlined">
          -
        </Button>
      </div>
    </div>
  );
};

export default IsbnTextField;
