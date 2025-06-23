import { z } from 'zod'

export const videoSchema = z.object({
  title: z.string().min(5,"title atleast have 5 characters").max(20,"title can't be more than 20 charcters"),
  description: z.string().max(250,"Allowed only 250 characters"),
  tags :z.array(z.string().max(30,"Allowed only 20 Characters")).max(10,"You can add maximum only 10 tags")
});

export const videoSchemaFinal = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  tags :z.array(z.string().max(30,"Allowed only 20 Characters")).max(10,"You can add maximum only 10 tags").optional(),
  categoryId: z.string().optional()
});


export type videoInput = z.infer<typeof videoSchema>;
export type videoInputFinal = z.infer<typeof videoSchemaFinal>;