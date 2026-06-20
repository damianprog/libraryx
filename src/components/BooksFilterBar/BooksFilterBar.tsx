import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { JSX } from "react";
import styles from "./booksFilterBar.module.css";

export type SortOption = "date" | "alphabetical";
export type FilterOption = "all" | "currentlyReading" | "read";

type Props = {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  filterBy: FilterOption;
  onFilterChange: (value: FilterOption) => void;
};

const BooksFilterBar = ({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
}: Props): JSX.Element => {
  return (
    <div className={styles.bar}>
      <FormControl className={styles.control} size="small">
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select<SortOption>
          labelId="sort-by-label"
          label="Sort by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <MenuItem value="date">Date added</MenuItem>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={styles.control} size="small">
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select<FilterOption>
          labelId="filter-label"
          label="Filter"
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value as FilterOption)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="currentlyReading">Currently reading</MenuItem>
          <MenuItem value="read">Read</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default BooksFilterBar;
