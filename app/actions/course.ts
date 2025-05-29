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

export async function getAllCourses() {
  try {
    const res = await axiosInstance.get("/courses");
    return {
      success: true,
      data: res.data.data
    };
  } catch (error: any) {
    console.error("Get courses error:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Failed to fetch courses"
    };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    const res = await axiosInstance.delete(`/courses/${courseId}`);
    return {
      success: true,
      data: res.data
    };
  } catch (error: any) {
    console.error("Delete course error:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Failed to delete course"
    };
  }
}

export async function getCourse(courseId: string) {
  try {
    const res = await axiosInstance.get(`/courses/${courseId}`);
    return {
      success: true,
      data: res.data.data
    };
  } catch (error: any) {
    console.error("Get course error:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Failed to fetch course"
    };
  }
}
