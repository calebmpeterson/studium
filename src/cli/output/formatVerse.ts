import chalk from "chalk";

export const formatVerse = (verse: number, text: string): string => {
  return `${chalk.dim(verse)} ${text}`;
};
