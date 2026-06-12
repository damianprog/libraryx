import type { ApiBook } from "../types/ApiBook";
import type { Book } from "../types/Book";

const getAuthors = (book: ApiBook): string => {
  let authors = "";

  if (book.volumeInfo.authors) {
    authors = book.volumeInfo.authors.join(", ");
  }

  return authors;
};

const getPublishedDate = (book: ApiBook): string => {
  let publishedDate = "";

  if (book.volumeInfo.publishedDate) {
    publishedDate = book.volumeInfo.publishedDate.slice(0, 4);
  }

  return publishedDate;
};

const getTitle = (book: ApiBook): string => {
  return book.volumeInfo.title ? book.volumeInfo.title : "";
};

const getCategories = (book: ApiBook): string => {
  return book.volumeInfo.categories ? book.volumeInfo.categories.join() : "";
};

const getIsbn = (book: ApiBook): string => {
  let isbn = "";

  if (book.volumeInfo.industryIdentifiers) {
    if (book.volumeInfo.industryIdentifiers[0]) {
      isbn = book.volumeInfo.industryIdentifiers[0].identifier
        ? book.volumeInfo.industryIdentifiers[0].identifier
        : "";
    }

    if (isbn === "" && book.volumeInfo.industryIdentifiers[1]) {
      isbn = book.volumeInfo.industryIdentifiers[1].identifier
        ? book.volumeInfo.industryIdentifiers[1].identifier
        : "";
    }
  }

  return isbn;
};

const getImg = (book: ApiBook): string => {
  let img = "";

  if (book.volumeInfo.imageLinks) {
    for (const value of Object.values(book.volumeInfo.imageLinks)) {
      if (value) {
        img = value;
        break;
      }
    }
  }

  if (img === "") {
    img =
      "https://thumbs.dreamstime.com/b/old-red-leather-texture-gold-decorative-frame-3780083.jpg";
  }

  return img;
};

const getPublisher = (book: ApiBook): string => {
  return book.volumeInfo.publisher ? book.volumeInfo.publisher : "";
};

const getPages = (book: ApiBook): number | string => {
  return book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "";
};

const restructureApiBook = (book: ApiBook): Book => {
  const restructuredBook: Book = {
    id: "",
    title: getTitle(book),
    authors: getAuthors(book),
    publishedDate: getPublishedDate(book),
    categories: getCategories(book),
    isbn: getIsbn(book),
    img: getImg(book),
    publisher: getPublisher(book),
    pages: getPages(book),
    series: "",
    volume: "",
    summary: "",
  };

  return restructuredBook;
};

export default restructureApiBook;
