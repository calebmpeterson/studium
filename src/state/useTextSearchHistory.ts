import { SearchHistory } from "@/types";
import useLocalStorageState from "use-local-storage-state";

export const useTextSearchHistory = () =>
  useLocalStorageState<SearchHistory>("search-history", { defaultValue: [] });
