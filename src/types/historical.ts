export type HistoricalEventColor =
  | "info"
  // Kingdoms of Daniel 2
  | "gold"
  | "silver"
  | "brass"
  | "iron"
  // Other events
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "green"
  | "blue"
  | "purple";

export type HistoricalEvent = {
  title: string;
  date_started: number;
  date_completed: number;
  approximate?: true;
  color?: HistoricalEventColor;
  details?: string;
  link?: string;
};

export type HistoricalMilestone = {
  title: string;
  date: number;
  approximate?: true;
  color: string;
  labelPosition?: "left";
};
