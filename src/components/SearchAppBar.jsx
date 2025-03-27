import styles from "./searchAppBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const SearchAppBar = ({ onSearchInputChange }) => {
  const [isDefaultMenuShown, setIsSearchMenuShown] = useState(true);

  const handleInputChange = (event) => {
    onSearchInputChange(event.target.value);
  };

  const handleMenuSwitch = () => {
    setIsSearchMenuShown(!isDefaultMenuShown);
    onSearchInputChange("");
  };

  return (
    <header className={styles.searchAppBar}>
      <div className={styles.container}>
        {isDefaultMenuShown ? (
          <div className={styles.deafultMenu}>
            <div className={styles.deafultMenuLeftSide}>
              <MenuIcon className={styles.icon} />
              <h1>LibraryX</h1>
            </div>
            <div className={styles.deafultMenuRightSide}>
              <SearchIcon className={styles.icon} onClick={handleMenuSwitch} />
            </div>
          </div>
        ) : (
          <div className={styles.searchMenu}>
            <ArrowBackIcon className={styles.icon} onClick={handleMenuSwitch} />
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
