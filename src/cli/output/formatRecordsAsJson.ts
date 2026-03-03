export const formatRecordsAsJson = <T>(records: T[]): string =>
  JSON.stringify(records, null, 2);
