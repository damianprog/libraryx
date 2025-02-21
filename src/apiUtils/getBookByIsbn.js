import axios from "axios";
import handleFetchedBooks from "./handleFetchedBooks";

const getBookByIsbn = async (isbn) => {
  try {
    const baseURL = "https://www.googleapis.com";

    const fetchBookByIsbn = await axios.get(
      `${baseURL}/books/v1/volumes?q=isbn:${isbn}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    );

    const book = handleFetchedBooks(fetchBookByIsbn)[0];

    return book;
  } catch (error) {
    console.log(error);
  }
};

export default getBookByIsbn;
