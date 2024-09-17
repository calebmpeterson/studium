import { isUndefined, mapKeys } from "lodash";

import colors from "@/styles/colors";
import { Patriarch, Patriarchs } from "@/types/genealogies";
import { HistoricalEvent } from "@/types/historical";

type Lookup = Record<string, Patriarch>;

const computeYearOfBirth = (lookup: Lookup, patriarch: Patriarch): number => {
  if (isUndefined(patriarch)) {
    return 0;
  }

  const offset = isUndefined(patriarch.ageOfFatherAtBirth)
    ? 0
    : patriarch.ageOfFatherAtBirth;

  return offset + computeYearOfBirth(lookup, lookup[patriarch.father]);
};

export const processGenealogy = (
  patriarchs: Patriarchs,
  offset: number
): HistoricalEvent[] => {
  const lookup = mapKeys(patriarchs, (patriarch) => patriarch.name);

  return patriarchs.map((patriarch) => ({
    title: patriarch.name,
    subTitle: `lived ${patriarch.age} years`,
    date_started: offset + computeYearOfBirth(lookup, patriarch),
    date_completed:
      offset + computeYearOfBirth(lookup, patriarch) + patriarch.age,
    details: `${patriarch.name} the son of ${patriarch.father} lived to be ${patriarch.age} years old.`,
    link: patriarch.reference,
    color: colors.emerald[200],
  }));
};
