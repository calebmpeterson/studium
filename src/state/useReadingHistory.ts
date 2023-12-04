import { ReadingHistory } from "@/types";
import useLocalStorageState from "use-local-storage-state";

export const useReadingHistory = () =>
  useLocalStorageState<ReadingHistory>("reading-history", { defaultValue: [] });
