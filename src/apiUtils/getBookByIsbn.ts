import axios from "axios";
import type { Book } from "../types/Book";
import type { FetchedBooksResponse } from "../types/FetchedBooksResponse";
import handleFetchedBooks from "./handleFetchedBooks";

const getBookByIsbn = async (isbn: string): Promise<Book | undefined> => {
  try {
    const baseURL = "https://www.googleapis.com";

    const fetchBookByIsbn = await axios.get<FetchedBooksResponse>(
      `${baseURL}/books/v1/volumes?q=isbn:${isbn}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`,
    );

    const book = handleFetchedBooks(fetchBookByIsbn.data)[0];

    return book;
  } catch (error: unknown) {
    console.log(error);
  }
};

export default getBookByIsbn;
