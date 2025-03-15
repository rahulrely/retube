import {z} from "zod";

export const emailValidation = z
    .string()
    .email({message : "Invalid EmailID"})


export const loginSchema = z.object({
    email : emailValidation,  //identifier
    password : z.string().min(8,"Min Lenght 8").max(16,"Max lenght 16")
})