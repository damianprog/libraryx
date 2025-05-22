import axios from "axios";
import handleFetchedBooks from "./handleFetchedBooks";

const getBooksByName = async (name) => {
  try {
    const baseURL = "https://www.googleapis.com";

    const fetchBooksByName = await axios.get(
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
