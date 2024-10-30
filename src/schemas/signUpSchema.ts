import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast two characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email addresss'}),
    password: z.string().min(6, {message: 'password atlest must be 6 characters'})
})

