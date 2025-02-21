import restructureApiBook from "./restructureApiBook";

const getValidBooks = (fetchedBooks) => {
  let validBooks = [];

  if (fetchedBooks.data.items) {
    validBooks = fetchedBooks.data.items.filter((book) => book.volumeInfo);
  }

  return validBooks;
};

const getRestructuredBooks = (fetchedBooks) => {
  const restructuredBooks = fetchedBooks.map((book) => {
    return restructureApiBook(book);
  });

  return restructuredBooks;
};

const handleFetchedBooks = (fetchedBooks) => {
  const validBooks = getValidBooks(fetchedBooks);

  const restructuredBooks = getRestructuredBooks(validBooks);

  return restructuredBooks;
};

export default handleFetchedBooks;
