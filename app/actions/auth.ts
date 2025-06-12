"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function login(formData: { email: string; password: string }) {
  try {
    
    const response = await axiosInstance.post("/auth/login", formData);
    const data = response.data;


    if (data?.accessToken || !data?.refreshToken) {
      const cookieStore = await cookies();
      // Store access token
      cookieStore.set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
      // Store refresh token
      cookieStore.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60,
      });
      // Store user data
      cookieStore.set("user", JSON.stringify(data.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });

      if (data.user.roles.includes("student")) {
        return { success: true, redirectTo: "/dashboard" };
      } else {
        return { success: true, redirectTo: "/admin" };
      }
    } else {
      return {
        success: false,
        error: "Invalid server response: Missing tokens",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        error: "Invalid credentials",
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function logout() {
  try {
    await axiosInstance.post("/auth/logout");
    
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");
    
    redirect("/signin");
  } catch (error) {
    console.error('Logout error:', error);
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");
    redirect("/signin");
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", { email });

    if (!response.data.success) {
      return {
        success: false,
        error: response.data.errors?.[0]?.msg || "Failed to send reset link",
      };
    }

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getUserProfileDetails() {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}

export async function isUserAdmin() {
  const cookieStore = await cookies();

  const userDataStr = cookieStore.get("user")?.value || "";
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  if (!userData) {
    return false;
  }
  if (userData) {
    return userData.roles.includes("admin");
  }
  return false;
}


