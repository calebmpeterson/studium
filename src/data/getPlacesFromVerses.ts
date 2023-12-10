import OpenAI from "openai";
import { extractJsonFromOpenAI } from "@/utils/extractJsonFromOpenAI";
import { Place, Verse } from "@/types";
import { enhancePlaces } from "./enhancePlaces";

type Result = [Place[], number];

export const getPlacesFromVerses = async (verses: Verse[]): Promise<Result> => {
  try {
    const corpus = verses.map((verse) => verse.text).join("\n");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Given the following text, extract all geographic locations as a JSON list of strings.",
        },
        {
          role: "user",
          content: corpus,
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(`getPlacesFromVerses`, response.usage);

    const places = extractJsonFromOpenAI(response);

    return [enhancePlaces(places), 200];
  } catch (error: unknown) {
    console.error(`Failed to get places from book and chapter.`);
    return [[], 500];
  }
};
