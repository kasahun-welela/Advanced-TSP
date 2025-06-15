"use server";

import axiosInstance from "@/lib/axios";        

export async function getGroupSessions() {
  try {
    const res = await axiosInstance.get("/groups");
    return {
      success: true,
      data: res.data,
    };
  } catch (error: unknown) {
    console.error("Get group sessions error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to get group sessions";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getLiveSessions() {
  try {
    const res = await axiosInstance.get("/live-sessions");
    return {
      success: true,
      data: res.data,
    };
  } catch (error: unknown) {
    console.error("Get live sessions error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to get live sessions";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getLiveSessionsByCourseId(courseId: string) {
  try {
    const res = await axiosInstance.get(`/live-sessions?course=${courseId}`);
    return {
      success: true,
      data: res.data,
    };  
  } catch (error: unknown) {
    console.error("Get live sessions by course id error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to get live sessions by course id";
    return {
      success: false,
      error: errorMessage,
    };
  }
}