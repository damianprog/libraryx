import type { Book } from "./Book";

export type UserBook = Book & { userId: string };
