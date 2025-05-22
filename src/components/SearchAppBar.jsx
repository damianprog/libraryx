import styles from "./searchAppBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { style } from "@mui/system";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const SearchAppBar = ({ onSearchInputChange }) => {
  const [isDefaultMenuShown, setIsSearchMenuShown] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    onSearchInputChange(event.target.value);
  };

  const handleMenuSwitch = () => {
    setIsSearchMenuShown(!isDefaultMenuShown);
    onSearchInputChange("");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("loggedUserUidLibraryX", null);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={styles.searchAppBar}>
      <div className={styles.container}>
        {isDefaultMenuShown ? (
          <div className={styles.deafultMenu}>
            <div className={styles.deafultMenuLeftSide}>
              <MenuIcon
                className={styles.icon}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
              <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
              >
                <div className={styles.drawerItems}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={logout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              </Drawer>
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
