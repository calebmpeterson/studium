export const abort = (message: string, error?: unknown) => {
  console.error(message, error ?? "no error available");
  process.exit(1);
};
