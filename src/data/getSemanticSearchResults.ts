import { isUndefined } from "lodash";
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

import { VerseReference } from "@/types";

import { normalizeQuery } from "./normalizeQuery";
import { normalizeVerseReferences } from "./normalizeVerseReferences";

type Result = VerseReference[];

const PROMPT = `
Given the following query, identify relevant Bible references.
`;

const VerseReferenceSchema = z.object({
  book: z.string(),
  chapter: z.string(),
  verse: z.string(),
});

export const getSemanticSearchResults = async (
  query: string | string[] | undefined
): Promise<Result> => {
  if (isUndefined(query)) {
    return [];
  }

  try {
    const normalizedQuery = normalizeQuery(query);
    const { output: verses } = await generateText({
      model: openai("gpt-4o-mini"),
      output: Output.array({
        element: VerseReferenceSchema,
      }),
      system: PROMPT,
      prompt: `Query: ${normalizedQuery}`,
      temperature: 1,
    });

    return normalizeVerseReferences(verses);
  } catch (error: unknown) {
    console.error(`Failed to search for "${query}".`, error);
    return [];
  }
};
