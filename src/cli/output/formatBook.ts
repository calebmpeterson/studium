import chalk from "chalk";

export const formatBook = (book: string): string => {
  return chalk.underline.bold(book);
};
