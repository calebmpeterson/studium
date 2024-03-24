import { get } from "lodash";
import { OpenAI } from "openai";

export const extractJsonFromOpenAI = (response: OpenAI.ChatCompletion) => {
  if (response.choices[0]) {
    const { content } = response.choices[0].message;

    if (content) {
      try {
        return content.startsWith("```json")
          ? JSON.parse(content.slice(7, -3).trim())
          : JSON.parse(content);
      } catch (error: unknown) {
        console.error(
          `Failed to extract JSON from OpenAI response`,
          get(error, "message", "Unknown error"),
          content
        );
      }
    }
  }

  return null;
};
