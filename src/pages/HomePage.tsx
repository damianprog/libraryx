import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BooksList from "../components/booksList/BooksList";
import AddBookModal from "../components/AddBookModal/AddBookModal";
import SearchAppBar from "../components/SearchAppBar";
import { db, auth, userBookConverter } from "../config/firebase";
import type { UserBook } from "../types/UserBook";
import styles from "./homePage.module.css";

const Home = () => {
  const [allBooks, setAllBooks] = useState<UserBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<UserBook[]>([]);
  const loggedUserUid = localStorage.getItem("loggedUserUidLibraryX");
  const navigate = useNavigate();

  const booksCollectionRef = query(
    collection(db, "books").withConverter(userBookConverter),
    where("userId", "==", loggedUserUid)
  );

  const onSearchInputChange = (input: string) => {
    const foundBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBooks(foundBooks);
  };

  const getBooksList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const books = data.docs.map((doc) => doc.data());

      setAllBooks(books);
      setFilteredBooks(books);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loggedUserUid) {
      navigate("/sign-in");
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
