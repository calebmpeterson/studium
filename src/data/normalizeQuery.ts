import { isArray } from "lodash";

export const normalizeQuery = (query: string | string[]) =>
  isArray(query) ? query.join(" ") : query;
