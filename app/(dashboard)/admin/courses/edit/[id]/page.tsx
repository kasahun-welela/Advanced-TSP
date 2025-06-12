"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCourseById, updateCourse } from "@/app/actions/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ErrorMessage from "@/components/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";

const editCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  duration_months: z.number().min(0, "Duration must be 0 or greater"),
  status: z.enum(["draft", "published", "archived"]),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced"]),
  course_type: z.enum(["free", "paid"]),
});

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isCourseNotFound, setIsCourseNotFound] = useState(false);

  const form = useForm<z.infer<typeof editCourseSchema>>({
    resolver: zodResolver(editCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration_months: 0,
      status: "draft",
      difficulty_level: "beginner",
      course_type: "free",
    },
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseById(courseId);
        if (res.success && res.data?.course) {
          const courseData = res.data.course;
          const formData = {
            title: courseData.title,
            description: courseData.description,
            price: Number(courseData.price),
            duration_months: Number(courseData.duration_months),
            status: courseData.status,
            difficulty_level: courseData.difficulty_level,
            course_type: courseData.course_type,
          };
          form.reset(formData);
        } else {
          toast.error("Course not found");
          setIsCourseNotFound(true);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching course.";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, form]);

  const onSubmit = async (values: z.infer<typeof editCourseSchema>) => {
    if (!courseId) {
      toast.error("Invalid course ID. Cannot update.");
      return;
    }

    try {
      const res = await updateCourse(courseId, values);

      if (res.success) {
        toast.success("Course updated successfully.");
        setTimeout(() => {
          router.push("/admin/courses/allCourse");
        }, 2000);
      } else {
        toast.error(res.error || "Failed to update course.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error updating course.";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:mx-0  md:ml-12 space-y-6">
        <Skeleton className="h-8 w-1/3 mb-8" />
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-end pt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (isCourseNotFound) {
    return (
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:mx-0  md:ml-12">
        <ErrorMessage message="Course not found" />
      </div>
    );
  }

  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="Edit Course" />

      <Card className="md:max-w-[80%] max-w-[90%] mx-auto md:mx-0  md:ml-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary border-b pb-2">
            <span className="text-green-600">{form.watch("title")}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter course description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration_months"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Months)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter duration in months"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select course type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save Update"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
