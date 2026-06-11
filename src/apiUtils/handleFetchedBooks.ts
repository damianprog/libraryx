import type { ApiBook } from "../types/ApiBook";
import type { Book } from "../types/Book";
import type { FetchedBooksResponse } from "../types/FetchedBooksResponse";
import restructureApiBook from "./restructureApiBook";

const getValidBooks = (fetchedBooks: FetchedBooksResponse): ApiBook[] => {
  let validBooks: ApiBook[] = [];

  if (fetchedBooks.data.items) {
    validBooks = fetchedBooks.data.items.filter(
      (book): book is ApiBook => !!book.volumeInfo
    );
  }

  return validBooks;
};

const getRestructuredBooks = (fetchedBooks: ApiBook[]): Book[] => {
  const restructuredBooks = fetchedBooks.map((book) => {
    return restructureApiBook(book);
  });

  return restructuredBooks;
};

const handleFetchedBooks = (fetchedBooks: FetchedBooksResponse): Book[] => {
  const validBooks = getValidBooks(fetchedBooks);

  const restructuredBooks = getRestructuredBooks(validBooks);

  return restructuredBooks;
};

export default handleFetchedBooks;
