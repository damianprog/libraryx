import type { ApiBook } from "../types/ApiBook";
import type { Book } from "../types/Book";
import type { FetchedBooksResponse } from "../types/FetchedBooksResponse";
import restructureApiBook from "./restructureApiBook";

const getValidBooks = (fetchedBooks: FetchedBooksResponse): ApiBook[] =>
  fetchedBooks.items?.filter(
    (book): book is ApiBook => !!book.volumeInfo
  ) ?? [];

const handleFetchedBooks = (fetchedBooks: FetchedBooksResponse): Book[] =>
  getValidBooks(fetchedBooks).map(restructureApiBook);

export default handleFetchedBooks;
