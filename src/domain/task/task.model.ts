import { z } from "zod";

export const task = z.object({
  id: z.string(),
  description: z.string(),
  done: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
