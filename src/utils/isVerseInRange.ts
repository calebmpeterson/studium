export const isVerseInRange = (verse: number, range: string): boolean => {
  // Split by comma to handle multiple ranges
  const ranges = range.split(",");

  // Check each range
  return ranges.some((r) => {
    // Check if the current range is a single number
    if (!r.includes("-")) {
      const singleNumber = parseInt(r.trim(), 10);
      return verse === singleNumber;
    }

    // Split the range into min and max values
    const [min, max] = r.split("-").map((val) => parseInt(val.trim(), 10));

    return verse >= min && verse <= max;
  });
};
