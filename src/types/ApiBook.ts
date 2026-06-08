export type ApiBook = {
  volumeInfo: {
    title?: string;
    authors?: string[];
    publishedDate?: string;
    categories?: string[];
    industryIdentifiers?: { identifier?: string }[];
    imageLinks?: Record<string, string>;
    publisher?: string;
    pageCount?: number;
  };
};
