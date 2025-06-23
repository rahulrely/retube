import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string()
    .min(8,"Incorrect Passsword")
    .max(15,"Incorrect Passsword")
    .regex(/[A-Z]/,"Incorrect Passsword")
    .regex(/[a-z]/,"Incorrect Passsword")
    .regex(/[0-9]/,"Incorrect Passsword")
    .regex(/[\W_]/,"Incorrect Passsword"),
});

export type SignInInput = z.infer<typeof signInSchema>;