import type { ChangeEvent, JSX, MouseEvent } from "react";

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

// Native date inputs only open the picker from the calendar icon;
// showPicker() lets a click anywhere in the field open it.
const openPicker = (event: MouseEvent<HTMLInputElement>): void => {
  try {
    event.currentTarget.showPicker();
  } catch {
    // showPicker() is unsupported or blocked (e.g. no user activation);
    // the browser falls back to its default behaviour.
  }
};

const DateInput = ({ value, onChange, className }: Props): JSX.Element => (
  <input
    type="date"
    value={value}
    className={className}
    onChange={onChange}
    onClick={openPicker}
  />
);

export default DateInput;
