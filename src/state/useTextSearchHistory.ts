import useLocalStorageState from "use-local-storage-state";

import { SearchHistory } from "@/types";

export const useTextSearchHistory = () =>
  useLocalStorageState<SearchHistory>("search-history", { defaultValue: [] });
