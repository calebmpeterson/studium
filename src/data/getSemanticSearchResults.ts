import { VerseReference } from "@/types";
import { extractJsonFromOpenAI } from "@/utils/extractJsonFromOpenAI";
import OpenAI from "openai";
import { normalizeVerseReferences } from "./normalizeVerseReferences";
import { isUndefined } from "lodash";
import { normalizeQuery } from "./normalizeQuery";

type Result = VerseReference[];

const PROMPT = `
Given the following query, respond with a list of relevant Bible references in JSON using the schema:

[{ "book": string, "chapter": number, "verse": number }]
`;

export const getSemanticSearchResults = async (
  query: string | string[] | undefined
): Promise<Result> => {
  if (isUndefined(query)) {
    return [];
  }

  try {
    const normalizedQuery = normalizeQuery(query);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: PROMPT,
        },
        {
          role: "user",
          content: `Query: ${normalizedQuery}`,
        },
      ],
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const verses = extractJsonFromOpenAI(response);

    return normalizeVerseReferences(verses);
  } catch (error: unknown) {
    console.error(`Failed to search for "${query}".`, error);
    return [];
  }
};
