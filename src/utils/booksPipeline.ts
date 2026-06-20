import type {
  FilterOption,
  SortOption,
} from "../components/BooksFilterBar/BooksFilterBar";
import type { UserBook } from "../types/UserBook";

export const filterByStatus = (
  books: UserBook[],
  filterBy: FilterOption
): UserBook[] => {
  if (filterBy === "currentlyReading") {
    return books.filter((b) => !b.isRead && b.readStartDate);
  }
  if (filterBy === "read") {
    return books.filter((b) => b.isRead);
  }
  return books;
};

export const filterBySearch = (
  books: UserBook[],
  searchInput: string
): UserBook[] => {
  if (!searchInput) return books;
  const q = searchInput.toLowerCase();
  return books.filter((b) => b.title.toLowerCase().includes(q));
};

const compareByCreatedAt = (a: UserBook, b: UserBook): number => {
  if (a.createdAt === null && b.createdAt === null) return 0;
  if (a.createdAt === null) return 1;
  if (b.createdAt === null) return -1;
  return b.createdAt.toMillis() - a.createdAt.toMillis();
};

export const sortBooks = (
  books: UserBook[],
  sortBy: SortOption
): UserBook[] => {
  const sorted = [...books];
  if (sortBy === "alphabetical") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sorted.sort(compareByCreatedAt);
  }
  return sorted;
};
