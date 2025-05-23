"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

export async function login(formData: { email: string; password: string }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log(data);

    if (!data.success) {
      return {
        success: false,
        error: data.errors?.[0]?.msg || "Authentication failed",
      };
    }

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
    return {
      success: false,
      error: error,
    };
  }
}

export async function logout() {
  try {
    // Call the API to clear the session on the server
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // This ensures cookies are sent with the request
    });

    // Clear local cookies
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");
    
    redirect("/");
  } catch (error) {
    console.error('Logout error:', error);
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");
    redirect("/");
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      { email }
    );

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
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

