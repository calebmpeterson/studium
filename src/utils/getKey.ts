type Part = string | number;

export const getKey = (...parts: Part[]): string => parts.join("-");
