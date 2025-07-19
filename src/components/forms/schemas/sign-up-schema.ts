import * as z from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Full name must be at least 2 characters" }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, { error: "Password must be of atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be of atleast 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ISignUpForm = z.infer<typeof SignUpSchema>;
