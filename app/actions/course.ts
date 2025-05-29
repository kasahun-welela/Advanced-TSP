"use server";

import axiosInstance from "@/lib/axios";

export async function createCourse(formData: {
  title: string;
  description: string;
  thumbnail: string;
  logo_url: string;
  price: number;
  difficulty_level: string;
  status: string;
  duration_months: number;
  course_type: string;
  delivery_method: string;
}) {
  try {
    const res = await axiosInstance.post("/courses", formData);
    return {
      success: true,
      data: res.data
    };
  } catch (error: any) {
    console.error("Create course error:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Failed to create course"
    };
  }
}
