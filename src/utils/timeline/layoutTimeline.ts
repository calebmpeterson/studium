import { HistoricalEvent } from "@/types/historical";

const START_PROP = "date_started";
const END_PROP = "date_completed";

const MIN_SPACING = 300;

export const layout = (intervals: HistoricalEvent[]) => {
  // Sort intervals by their end times in ascending order
  intervals.sort((a, b) => a[END_PROP] - b[END_PROP]);

  // Initialize the result as an array containing the first interval in its own row
  const result = [[intervals[0]]];

  // Loop through the remaining intervals and place them in the first row that doesn't overlap
  for (let i = 1; i < intervals.length; i++) {
    let placed = false;
    for (let j = 0; j < result.length; j++) {
      const lastInterval = result[j][result[j].length - 1];
      if (intervals[i][START_PROP] - MIN_SPACING >= lastInterval[END_PROP]) {
        result[j].push(intervals[i]);
        placed = true;
        break;
      }
    }
    if (!placed) {
      result.push([intervals[i]]);
    }
  }

  return result;
};
