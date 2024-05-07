const parseVersesList = (versesList: string): number[] => {
  const ranges: number[] = [];
  const rangeGroups: string[] = versesList
    .split(",")
    .map((group) => group.trim());

  rangeGroups.forEach((group) => {
    if (group.includes("-")) {
      const [start, end]: number[] = group
        .split("-")
        .map((num) => parseInt(num.trim(), 10));

      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          ranges.push(i);
        }
      }
    } else {
      const pageNumber: number = parseInt(group, 10);
      if (!isNaN(pageNumber)) {
        ranges.push(pageNumber);
      }
    }
  });

  return ranges;
};

const versesListString: string = "1-5, 8, 10-12";
const parsedRanges: number[] = parseVersesList(versesListString);
console.log(parsedRanges);
