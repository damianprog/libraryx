import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BooksList from "../components/booksList/BooksList";
import AddBookModal from "../components/BasicModal/AddBookModal";
import SearchAppBar from "../components/SearchAppBar";
import { db, auth } from "../config/firebase";
import styles from "./homePage.module.css";

const Home = () => {
  const [booksList, setBooksList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const booksCollectionRef = useMemo(() => collection(db, "books"), []);

  const onSearchInputChange = (input) => {
    setSearchInput(input);
  };

  const getBooksList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setBooksList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const localStorageLoggedUserUid = localStorage.getItem(
      "loggedUserUidLibraryX"
    );

    if (localStorageLoggedUserUid === "null") {
      navigate("/sign");
    }

    getBooksList();
  }, [auth]);

  return (
    <>
      <SearchAppBar onSearchInputChange={onSearchInputChange} />
      <div className={styles.container}>
        <BooksList books={booksList} showAddButton={false} />
      </div>
      <AddBookModal />
    </>
  );
};

export default Home;
