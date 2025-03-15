import {z} from "zod";

export const emailValidation = z
    .string()
    .email("Invaild EmailID")


export const signupSchema = z.object({
    name : z.string().regex(/^[A-Za-z ]+$/),
    email : emailValidation,
    password : z.string().min(8,"Min Lenght 8").max(16,"Max lenght 16")
})
