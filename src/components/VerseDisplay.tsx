import { Verse } from "@/types";
import { FC } from "react";

export const VerseDisplay: FC<Verse> = ({ verse, text }) => (
  <div>
    <sup>{verse}</sup>&nbsp;
    {text}
  </div>
);
