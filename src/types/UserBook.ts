import type { Book } from "./Book";

export type UserBook = Book & {
  userId: string;
  isRead: boolean;
  readStartDate: string;
  readEndDate: string;
  notes: string;
};
