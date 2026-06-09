import type { RawApiBook } from "./RawApiBook";

export type FetchedBooksResponse = {
  data: {
    items?: RawApiBook[];
  };
};
