import styles from "./searchAppBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const SearchAppBar = ({ onSearchInputChange }) => {
  const [isDefaultMenuShown, setIsSearchMenuShown] = useState(true);
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
    onSearchInputChange(input);
  };

  const handleMenuSwitch = () => {
    setIsSearchMenuShown(!isDefaultMenuShown);
  };

  return (
    <header className={styles.searchAppBar}>
      <div className={styles.container}>
        {isDefaultMenuShown ? (
          <div className={styles.deafultMenu}>
            <div className={styles.deafultMenuLeftSide}>
              <MenuIcon />
              <h1>LibraryX</h1>
            </div>
            <div className={styles.deafultMenuRightSide}>
              <SearchIcon onClick={handleMenuSwitch} />
            </div>
          </div>
        ) : (
          <div className={styles.searchMenu}>
            <ArrowBackIcon onClick={handleMenuSwitch} />
            <input
              id="searchInput"
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default SearchAppBar;
