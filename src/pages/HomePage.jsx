import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BooksList from "../components/BooksList/BooksList";
import AddBookModal from "../components/BasicModal/AddBookModal";
import SearchAppBar from "../components/SearchAppBar";
import { db, auth } from "../config/firebase";
import styles from "./homePage.module.css";

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  const booksCollectionRef = useMemo(() => collection(db, "books"), []);

  const onSearchInputChange = (input) => {
    const foundBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBooks(foundBooks);
  };

  const getBooksList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAllBooks(filteredData);
      setFilteredBooks(filteredData);
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
        <BooksList books={filteredBooks} showingUserBooks={true} />
        <AddBookModal />
      </div>
    </>
  );
};

export default Home;
