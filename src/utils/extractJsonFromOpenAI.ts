import { OpenAI } from "openai";

export const extractJsonFromOpenAI = (response: OpenAI.ChatCompletion) => {
  try {
    if (response.choices[0]) {
      const { content } = response.choices[0].message;

      if (content) {
        return JSON.parse(content);
      }
    }
  } catch (error: unknown) {
    console.error(`Failed to extract JSON from OpenAI response`, error);
  }

  return null;
};
