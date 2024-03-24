import { isArray } from "lodash";

export const sanitizeQuery = (query: string | string[]) =>
  isArray(query) ? query.join(" ") : query;
