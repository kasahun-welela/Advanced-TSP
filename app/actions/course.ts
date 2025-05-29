"use server";

import { CreateCourse } from "@/interfaces";
import axiosInstance from "@/lib/axios";

export async function createCourse(formData: CreateCourse) {
  try {
    const res = await axiosInstance.post("/courses", formData);
    return {
      success: true,
      data: res.data,   
    };
  } catch (error: any) {
    console.error("Create course error:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to create course",
    };
  }
}
