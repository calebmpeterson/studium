import stem from "wink-porter2-stemmer";

export const stemWord = (word: string): string =>
  stem(word.toLowerCase());
