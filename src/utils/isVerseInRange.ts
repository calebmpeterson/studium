export const isVerseInRange = (verse: number, range: string): boolean => {
  // Check if the range is a single number
  if (!range.includes("-")) {
    const single = parseInt(range, 10);
    return verse === single;
  }

  // Split the range into min and max values
  const [min, max] = range.split("-").map((val) => parseInt(val, 10));

  return verse >= min && verse <= max;
};
