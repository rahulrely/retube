import { z } from "zod"

export const nameEditSchema = z.object({
  name: z.string()
    .min(4, "Name must be at least 4 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
});

export type nameEditInput = z.infer<typeof nameEditSchema>;
