export const interpose = <T>(array: T[], separator: T): T[] =>
  array.flatMap((item, i) =>
    i < array.length - 1 ? [item, separator] : [item]
  );
