import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { error: "Password must be of atleast 8 characters" }),
});

export type ISignInForm = z.infer<typeof SignInSchema>;
