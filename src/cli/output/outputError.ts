export const outputError = (error: unknown): void => {
  if (error instanceof Error) {
    console.error(error.message);
    return;
  }

  console.error("Unknown CLI error.");
};
