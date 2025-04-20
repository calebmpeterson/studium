import { z } from "zod";

export const FirstMentionSchema = z.object({
  reference: z.string(),
  book: z.string(),
  chapter: z.string(),
  verse: z.string(),
  text: z.string(),
});

export type FirstMention = z.infer<typeof FirstMentionSchema>;

export const FirstMentionIndexSchema = z.record(FirstMentionSchema);

export type FirstMentionIndex = z.infer<typeof FirstMentionIndexSchema>;
