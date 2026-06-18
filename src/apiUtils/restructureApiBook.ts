import type { ApiBook } from "../types/ApiBook";
import type { Book } from "../types/Book";

const FALLBACK_IMG =
  "https://thumbs.dreamstime.com/b/old-red-leather-texture-gold-decorative-frame-3780083.jpg";

const getAuthors = (book: ApiBook): string =>
  book.volumeInfo.authors?.join(", ") ?? "";

const getPublishedDate = (book: ApiBook): string =>
  book.volumeInfo.publishedDate?.slice(0, 4) ?? "";

const getTitle = (book: ApiBook): string => book.volumeInfo.title ?? "";

const getCategories = (book: ApiBook): string =>
  book.volumeInfo.categories?.join() ?? "";

const getIsbn = (book: ApiBook): string => {
  const ids = book.volumeInfo.industryIdentifiers;
  return ids?.[0]?.identifier ?? ids?.[1]?.identifier ?? "";
};

const getImg = (book: ApiBook): string =>
  Object.values(book.volumeInfo.imageLinks ?? {}).find(Boolean) ?? FALLBACK_IMG;

const getPublisher = (book: ApiBook): string =>
  book.volumeInfo.publisher ?? "";

const getPages = (book: ApiBook): string =>
  book.volumeInfo.pageCount ? String(book.volumeInfo.pageCount) : "";

const restructureApiBook = (book: ApiBook): Book => ({
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
});

export default restructureApiBook;
