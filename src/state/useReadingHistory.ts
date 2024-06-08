import useLocalStorageState from "use-local-storage-state";

import { ReadingHistory } from "@/types";

export const useReadingHistory = () =>
  useLocalStorageState<ReadingHistory>("reading-history", { defaultValue: [] });
