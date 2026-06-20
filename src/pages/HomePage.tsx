import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState, type JSX } from "react";
import BooksList from "../components/BooksList/BooksList";
import AddBookModal from "../components/AddBookModal/AddBookModal";
import SearchAppBar from "../components/SearchAppBar";
import BooksFilterBar from "../components/BooksFilterBar/BooksFilterBar";
import type {
  FilterOption,
  SortOption,
} from "../components/BooksFilterBar/BooksFilterBar";
import { db, userBookConverter } from "../config/firebase";
import type { UserBook } from "../types/UserBook";
import { useAuth } from "../auth/AuthContext";
import {
  filterByStatus,
  filterBySearch,
  sortBooks,
} from "../utils/booksPipeline";
import styles from "./homePage.module.css";

const HomePage = (): JSX.Element => {
  const { user } = useAuth();
  const [allBooks, setAllBooks] = useState<UserBook[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const onSearchInputChange = (input: string): void => {
    setSearchInput(input);
  };

  const visibleBooks: UserBook[] = useMemo(() => {
    let books = filterByStatus(allBooks, filterBy);
    books = filterBySearch(books, searchInput);
    return sortBooks(books, sortBy);
  }, [allBooks, sortBy, filterBy, searchInput]);

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
        setAllBooks(books);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    getBooksList();
  }, []);

  return (
    <>
      <SearchAppBar onSearchInputChange={onSearchInputChange} />
      <div className={styles.below}>
        <BooksFilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
        />
        <div className={styles.container}>
          <BooksList<UserBook> books={visibleBooks} showingUserBooks={true} />
          <AddBookModal />
        </div>
      </div>
    </>
  );
};

export default HomePage;
