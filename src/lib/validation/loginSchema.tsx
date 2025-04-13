import { z } from "zod";

export const base = z.object({
  email: z.string(),
  password: z.string(),
});
