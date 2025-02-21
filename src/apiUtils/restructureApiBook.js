const getAuthors = (book) => {
  // return book.volumeInfo.authors ? book.volumeInfo.authors : [""];

  // return [
  //   {
  //     firstname: "Jon",
  //     lastname: "Snow",
  //   },
  //   {
  //     firstname: "Jon",
  //     lastname: "Snow",
  //   },
  //   {
  //     firstname: "Jon",
  //     lastname: "Snow",
  //   },
  // ];

  let authors = [];
  if (book.volumeInfo.authors) {
    authors = book.volumeInfo.authors.map((names) => {
      const authorNames = names.split(" ");

      return {
        firstname: authorNames[0],
        lastname: authorNames.slice(1).join(" "),
      };
    });
  }

  return authors;
};

const getPublishedDate = (book) => {
  let publishedDate = "";

  if (book.volumeInfo.publishedDate) {
    publishedDate = book.volumeInfo.publishedDate.slice(0, 4);
  }

  return publishedDate;
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

const getPublisher = (book) => {
  return book.volumeInfo.publisher ? book.volumeInfo.publisher : "";
};

const getPages = (book) => {
  return book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "";
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
    publisher: getPublisher(book),
    pages: getPages(book),
    series: "",
    volume: "",
    summary: "",
  };

  return restructuredBook;
};

export default restructureApiBook;
