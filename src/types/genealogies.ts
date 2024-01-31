type Adam = {
  name: "Adam";
  reference: string;
  age: number;
  father: "God";
  ageOfFatherAtBirth: undefined;
};

export type Patriarch =
  | Adam
  | {
      name: string;
      reference: string;
      age: number;
      father: string;
      ageOfFatherAtBirth: number;
    };

export type Patriarchs = Patriarch[];
