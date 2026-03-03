export const ensureSingleTerm = (term: string): string => {
  const normalized = term.trim();

  if (normalized.length === 0) {
    throw new Error("Term cannot be empty.");
  }

  if (/\s/.test(normalized)) {
    throw new Error("The define command accepts a single term only.");
  }

  return normalized;
};
