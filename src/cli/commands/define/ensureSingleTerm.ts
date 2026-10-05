export const ensureSingleTerm = (term: string, command = "define"): string => {
  const normalized = term.trim();

  if (normalized.length === 0) {
    throw new Error("Term cannot be empty.");
  }

  if (/\s/.test(normalized)) {
    throw new Error(`The ${command} command accepts a single term only.`);
  }

  return normalized;
};
