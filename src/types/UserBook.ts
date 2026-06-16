import type { Timestamp } from "firebase/firestore";
import type { Book } from "./Book";

export type UserBook = Book & {
  userId: string;
  createdAt: Timestamp | null;
  isRead: boolean;
  readStartDate: string;
  readEndDate: string;
  notes: string;
};
