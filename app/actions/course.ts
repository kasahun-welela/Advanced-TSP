"use server";

import { CreateCourse, Course, CreatePhase } from "@/interfaces";
import axiosInstance from "@/lib/axios";

export async function createCourse(formData: CreateCourse) {
  try {
    const res = await axiosInstance.post("/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.data.success) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        error: res.data.error,
      };
    };
  } catch (error: unknown) {
    console.error("Create course error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create course";
    return {
      success: false,
      error: errorMessage
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
  } catch (error: unknown) {
    console.error("Get courses error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch courses";
    return {
      success: false,
      error: errorMessage
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
  } catch (error: unknown) {
    console.error("Delete course error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete course";
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function getCourseById(courseId: string) {
  try {
    const res = await axiosInstance.get(`/courses/${courseId}`);
    return {
      success: true,
      data: res.data.data
    };
  } catch (error: unknown) {
    console.error("Get course error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch course";
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function updateCourse(courseId: string, formData: Partial<Course>) {
  try {
    const res = await axiosInstance.put(`/courses/${courseId}`, formData);
    return {
      success: true,
      data: res.data
    };
  } catch (error: unknown) {
    console.error("Update course error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update course";
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function createCoursePhase(formData: CreatePhase) {
  try {
    const res = await axiosInstance.post("/phases", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.data.success) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {  
        success: false,
        error: res.data.message,
      };
    }
  } catch (error: unknown) {
    console.error("Create phase error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create phase";
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function getPhasesByCourseId(course: string) {
  try {
    const res = await axiosInstance.get(`/phases?course=${course}`);
    return {
      success: true,
      data: res.data
    };
  } catch (error: unknown) {  
    console.error("Get phases error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch phases";
    return {
      success: false,
      error: errorMessage
    };
  }
}