"use server";
import { ISignInForm } from "@/components/forms/schemas/sign-in-schema";
import { ISignUpForm } from "@/components/forms/schemas/sign-up-schema";
import { env } from "@/lib/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData: ISignUpForm) {
  try {
    const response = await fetch(`${env.SERVER_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const err = await response.json();
      return { data: null, error: err.error || "Registration failed" };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Something went wrong" };
  }
}

export async function signIn(formData: ISignInForm) {
  try {
    const res = await fetch(`${env.SERVER_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      return { data: null, error: err.error || "Login failed" };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Something went wrong" };
  }
}

export async function redirectIfSession(path: string = "/dashboard") {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value ?? null;

  if (userId) {
    redirect(path);
  }
}

export async function redirectIfNoSession(path: string = "/login") {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect(path);
  }
}

export async function isUserActive() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return false;

  return true;
}
