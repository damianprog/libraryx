const getAuthors = (book) => {
  return book.volumeInfo.authors ? book.volumeInfo.authors.join() : "";
};

const getPublishedDate = (book) => {
  return book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "";
};

const getTitle = (book) => {
  return book.volumeInfo.title ? book.volumeInfo.title : "";
};

const getCategories = (book) => {
  return book.volumeInfo.categories ? book.volumeInfo.categories.join() : "";
};

const getIsbn = (book) => {
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

const getImg = (book) => {
  let img = "";

  if (book.volumeInfo.imageLinks) {
    for (const [key, value] of Object.entries(book.volumeInfo.imageLinks)) {
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

const restructureApiBook = (book) => {
  const restructuredBook = {
    id: book.id,
    title: getTitle(book),
    authors: getAuthors(book),
    publishedDate: getPublishedDate(book),
    categories: getCategories(book),
    isbn: getIsbn(book),
    img: getImg(book),
  };

  return restructuredBook;
};

export default restructureApiBook;
