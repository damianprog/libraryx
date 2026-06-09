import axios from "axios";
import type { Book } from "../types/Book";
import type { FetchedBooksResponse } from "../types/FetchedBooksResponse";
import handleFetchedBooks from "./handleFetchedBooks";

const getBooksByName = async (name: string): Promise<Book[] | undefined> => {
  try {
    const baseURL = "https://www.googleapis.com";

    const fetchBooksByName = await axios.get<FetchedBooksResponse["data"]>(
      `${baseURL}/books/v1/volumes?q=${name}&maxResults=40&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    );

    const books = handleFetchedBooks(fetchBooksByName);

    return books;
  } catch (error) {
    console.log(error);
  }
};

export default getBooksByName;
