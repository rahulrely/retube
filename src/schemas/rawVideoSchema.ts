import { z } from 'zod'

export const rawVideoSchema = z.object({
  title: z.string().min(5,"title atleast have 5 characters").max(20,"title can't be more than 20 charcters"),
  instructions: z.string().max(250,"Allowed only 250 characters")
});

export type rawVideoInput = z.infer<typeof rawVideoSchema>;