// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import TOC from "@/data/json/table-of-contents.json";
import { TableOfContents } from "@/types";

export const getTableOfContents = (): TableOfContents => TOC;
