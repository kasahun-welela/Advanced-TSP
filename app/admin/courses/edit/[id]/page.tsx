"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCourse, updateCourse } from "@/app/actions/course";
import { Course } from "@/interfaces";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing in URL");
      return;
    }
    const fetchCourse = async () => {
      try {
        const res = await getCourse(courseId);
        if (res.success && res.data) {
          setCourse(res.data);
        } else {
          setMessage(res.error || "Failed to fetch course.");
          setMessageType("error");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching course.";
        setMessage(errorMessage);
        setMessageType("error");
      } finally {
        setLoading(false);
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]:
          name === "price" || name === "duration_months"
            ? Number(value)
            : value,
      };
    });
  };

  const showMessage = (msg: string, type: "success" | "error" = "error") => {
    setMessage(msg);
    setMessageType(type);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    if (
      !course.title ||
      typeof course.title !== "string" ||
      course.title.trim() === ""
    ) {
      showMessage("Title is required and must be a non-empty string.", "error");
      return;
    }
    if (!courseId) {
      showMessage("Invalid course ID. Cannot update.", "error");
      return;
    }
    setSaving(true);
    try {
      console.log("Updating course with payload:", course);
      const res = await updateCourse(courseId, course);

      if (res.success) {
        showMessage("Information updated successfully.", "success");

        setTimeout(() => {
          router.push("/admin/courses/allCourse");
        }, 2000);
      } else {
        showMessage(`Update failed. Reason: ${res.error}`, "error");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error updating course.";
      showMessage(errorMessage, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-sm">Loading course data...</p>
      </div>
    );
  if (!course) return <p>{message || "Course not found."}</p>;
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md mt-8 relative">
      <h6 className="text-2xl font-bold text-green-800 mb-8 border-b pb-2">
        <span className="text-green-600">{course.title}</span>
      </h6>
      {/* Top alert message like screenshot */}
      {message && (
        <div
          className={`w-full px-4 py-3 mb-6 rounded-md text-sm font-medium border ${
            messageType === "success"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
          role="alert"
        >
          {messageType === "error" && (
            <strong className="font-semibold">Failed:</strong>
          )}{" "}
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Course Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={course.title || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={course.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={course.price || 0}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="duration_months" className="block font-medium mb-1">
            Duration (Months)
          </label>
          <input
            id="duration_months"
            name="duration_months"
            type="number"
            value={course.duration_months || 0}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="status" className="block font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={course.status || "draft"}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label htmlFor="difficulty_level" className="block font-medium mb-1">
            Difficulty Level
          </label>
          <select
            id="difficulty_level"
            name="difficulty_level"
            value={course.difficulty_level || "beginner"}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="course_type" className="block font-medium mb-1">
            Course Type
          </label>
          <select
            id="course_type"
            name="course_type"
            value={course.course_type || "free"}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div className="flex justify-end gap-4 pt-4 relative">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
