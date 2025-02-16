import axios from "axios";
import restructureApiBook from "./restructureApiBook";

const getBooksByName = async (name) => {
  const baseURL = "https://www.googleapis.com";

  try {
    const fetchBooksByName = await axios.get(
      `${baseURL}/books/v1/volumes?q=${name}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    );

    let fetchedBooks = [];

    if (fetchBooksByName.data.items) {
      fetchedBooks = fetchBooksByName.data.items.filter(
        (book) => book.volumeInfo
      );
    }

    const restructuredBooks = fetchedBooks.map((book) => {
      return restructureApiBook(book);
    });

    return restructuredBooks;
  } catch (error) {
    console.log(error);
  }
};

export default getBooksByName;
