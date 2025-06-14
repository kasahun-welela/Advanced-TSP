"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2, FilePlus, FileText, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getAllCourses,
  deleteCourse,
  getCourseById,
} from "@/app/actions/course";
import { Course } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ErrorMessage from "@/components/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await getAllCourses();
        if (res.success && Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          toast.error(res.error || "Failed to load courses.");
        }
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        toast.error("An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  const handleDelete = async (courseId: string) => {
    setLoading(true);
    try {
      const res = await deleteCourse(courseId);

      if (res.success) {
        setCourses((prev) => prev.filter((course) => course._id !== courseId));
        toast.success("Course deleted successfully.");
      } else {
        toast.error(`Failed to delete the course. Reason: ${res.error}`);
      }
    } catch (err: unknown) {
      console.error("Delete error:", err);
      toast.error(
        `Could not delete the course. Reason: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (courseId: string) => {
    try {
      const res = await getCourseById(courseId);

      if (res.success && res.data) {
        localStorage.setItem("editCourse", JSON.stringify(res.data));
        router.push(`/admin/courses/edit/${courseId}`);
      } else {
        toast.error(`Failed to fetch course data. Reason: ${res.error}`);
      }
    } catch (err: unknown) {
      console.error("Edit fetch error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Could not load course. Reason: ${errorMessage}`);
    }
  };

  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="All Courses" />
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:mx-0  md:ml-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Courses</h1>
          <Link
            href="/admin/courses/createCourse"
            className="bg-primary/70 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary/80"
          >
            <FilePlus size={16} /> Create New Course
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <ErrorMessage message="No courses available." />
        ) : (
          <div className="space-y-6">
            {courses.map((course) => (
              <Card
                className="w-full my-2 hover:shadow-md transition-all duration-300"
                key={course._id}
              >
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      {course.price === 0 ? "Free" : `Paid - $${course.price}`}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                      {course.duration_months} Months
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                    >
                      {course.delivery_method}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      <FileText size={14} className="mr-1" /> {course.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button
                    variant="outline"
                    disabled={loading}
                    onClick={() => handleEdit(course._id)}
                    className="flex items-center text-blue-600 hover:underline gap-1 disabled:opacity-50"
                  >
                    <Pencil size={14} /> Edit
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={loading}
                        className="text-red-600 hover:underline gap-1 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        {loading ? "Deleting..." : "Delete"}
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <span className="text-red-500">⚠️</span>
                          Confirm Delete
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete{" "}
                          <strong>{course?.title} </strong> course?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-4">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            disabled={loading}
                            onClick={async () => {
                              await handleDelete(course._id);
                            }}
                          >
                            {loading ? "Deleting..." : "Delete"}
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Link
                    href={`/admin/courses/${course._id}`}
                    className="flex items-center border px-2 py-1 rounded-md text-blue-600 hover:underline gap-1 disabled:opacity-50"
                  >
                    <Eye size={14} /> View
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllCoursesPage;
