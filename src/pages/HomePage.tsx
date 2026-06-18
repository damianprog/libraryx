import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState, type JSX } from "react";
import BooksList from "../components/BooksList/BooksList";
import AddBookModal from "../components/AddBookModal/AddBookModal";
import SearchAppBar from "../components/SearchAppBar";
import { db, userBookConverter } from "../config/firebase";
import type { UserBook } from "../types/UserBook";
import { useAuth } from "../auth/AuthContext";
import styles from "./homePage.module.css";

const HomePage = (): JSX.Element => {
  const { user } = useAuth();
  const [allBooks, setAllBooks] = useState<UserBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<UserBook[]>([]);

  const onSearchInputChange = (input: string): void => {
    const foundBooks: UserBook[] = allBooks.filter((book) =>
      book.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBooks(foundBooks);
  };

  useEffect(() => {
    if (!user) return;

    const getBooksList = async (): Promise<void> => {
      try {
        const booksCollectionRef = query(
          collection(db, "books").withConverter(userBookConverter),
          where("userId", "==", user.uid)
        );
        const data = await getDocs(booksCollectionRef);
        const books: UserBook[] = data.docs.map((doc) => doc.data());

        books.sort((a, b) => {
          if (a.createdAt === null && b.createdAt === null) return 0;
          if (a.createdAt === null) return 1;
          if (b.createdAt === null) return -1;
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        });

        setAllBooks(books);
        setFilteredBooks(books);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    getBooksList();
  }, []);

  return (
    <>
      <SearchAppBar onSearchInputChange={onSearchInputChange} />
      <div className={styles.container}>
        <BooksList<UserBook> books={filteredBooks} showingUserBooks={true} />
        <AddBookModal />
      </div>
    </>
  );
};

export default HomePage;
