import { listBookRecords } from "./listBookRecords";

export const listBooks = (query?: string): string[] =>
  listBookRecords(query).map(
    ({ title, abbreviation }) => `${title},${abbreviation}`
  );
