import OpenAI from "openai";
import { getBookAndChapter } from "@/data/getBookAndChapter";
import { extractJsonFromOpenAI } from "@/utils/extractJsonFromOpenAI";
import { Place } from "@/types";
import { enhancePlaces } from "./enhancePlaces";

type Result = [Place[], number];

export const getPlacesFromBookAndChapter = async (
  book: unknown,
  chapter: unknown
): Promise<Result> => {
  const [bookAndChapter, status] = getBookAndChapter(book, chapter);

  if ("verses" in bookAndChapter) {
    try {
      const corpus = bookAndChapter.verses
        .map((verse) => verse.text)
        .join("\n");
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
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(`getPlacesFromBookAndChapter`, response.usage);

      const places = extractJsonFromOpenAI(response);

      return [enhancePlaces(places), 200];
    } catch (error: unknown) {
      console.error(`Failed to get places from book and chapter.`);
      return [[], 500];
    }
  }

  console.error(`Could not get verses for ${book} ${chapter}`);

  return [[], status];
};
