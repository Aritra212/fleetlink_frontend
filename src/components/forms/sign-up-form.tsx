"use client";

import { useForm } from "react-hook-form";
import { ISignUpForm, SignUpSchema } from "./schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import useUser from "@/lib/hooks/use-user";
import { signUp } from "@/utils/data-access/auth";
import { toast } from "sonner";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { user, login } = useUser();

  const form = useForm<ISignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ISignUpForm) => {
    const { data, error } = await signUp(values);

    if (error) {
      toast.error(error);
      return;
    }

    const user = data.user;

    // Set context + localStorage
    login(user);
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie = `userId=${data.user._id}; path=/; max-age=86400`;

    toast.success("Account created successfully");
    router.push("/");
  };

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (user?._id) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
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
            loading={isLoading}
          >
            Sign up
          </Button>

          <p className="font-light text-sm">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="font-bold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
