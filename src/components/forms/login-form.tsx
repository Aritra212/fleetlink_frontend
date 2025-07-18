"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ISignInForm, SignInSchema } from "./schemas/sign-in-schema";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ISignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: ISignInForm) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="email" placeholder="Enter email" {...field} />
                  <Mail className="top-2.5 right-2.5 absolute w-4 h-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeIcon className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2 text-center mt-8">
          <Button
            type="submit"
            className="w-64 h-12 text-lg"
            disabled={isLoading}
            // loading={isLoading}
          >
            Login{" "}
          </Button>

          <p className="font-light text-sm">
            Don't have an account?{" "}
            <Link
              href={"/sign-up"}
              className="font-bold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
