
import {z} from "zod";

export const videoValidation = z.object({
    title :z.string(),
    description :z.string(),
})