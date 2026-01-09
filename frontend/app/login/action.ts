"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "../baseApi";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("Logging in with:", { username, password });

  try {
    // Simulate an API call to authenticate the user
    const response = await api.post("auth/login", {
      username,
      password,
    });

    const setCookiesHeader = response.headers["set-cookie"];
    if (setCookiesHeader) {
      const cookieStore = await cookies();
      const parts = setCookiesHeader[0].split(",");
      const accessToken = parts
        .find((part) => part.trim().startsWith("access-token="))
        ?.split("=")[1];
      if (!accessToken) {
        throw new Error("No access-token cookie found");
      }
      const maxAge = parts
        .find((part) => part.trim().startsWith("Max-Age="))
        ?.split("=")[1];

      cookieStore.set("access-token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: Number(maxAge),
      });
    }

    redirect("/");
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
