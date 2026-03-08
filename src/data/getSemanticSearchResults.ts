import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { isUndefined } from "lodash";
import { z } from "zod";

import { VerseReference } from "@/types";

import { normalizeQuery } from "./normalizeQuery";
import { normalizeVerseReferences } from "./normalizeVerseReferences";

type Result = VerseReference[];

const PROMPT = `
You are a helpful Bible scholarship assistant. Given the user's query,
identify all relevant Bible references. Order the results by relevance.
`;

const VerseReferenceSchema = z.object({
  book: z.string(),
  chapter: z.string(),
  verse: z.string(),
});

const OutputSchema = Output.array({
  element: VerseReferenceSchema,
});

export const getSemanticSearchResults = async (
  query: string | string[] | undefined,
): Promise<Result> => {
  if (isUndefined(query)) {
    return [];
  }

  try {
    const normalizedQuery = normalizeQuery(query);
    const { output: verses } = await generateText({
      model: openai("gpt-5"),
      output: OutputSchema,
      system: PROMPT,
      prompt: `Query: ${normalizedQuery}`,
    });

    return normalizeVerseReferences(verses);
  } catch (error: unknown) {
    console.error(`Failed to search for "${query}".`, error);
    return [];
  }
};
