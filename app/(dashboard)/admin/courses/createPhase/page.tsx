"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createPhaseSchema } from "@/validations/schema";
import { createCoursePhase, getAllCourses } from "@/app/actions/course";
import { Course } from "@/interfaces";
import type { CreatePhase } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeader from "@/components/DashboardHeader";

export default function CreatePhase() {
  const router = useRouter();
  const pathname = usePathname();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoadingCourses(true);
        const courses = await getAllCourses();
        if (courses.success) {
          setCourses(courses.data);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch courses", error);
        toast.error("Failed to fetch courses");
      } finally {
        setIsLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const form = useForm<z.infer<typeof createPhaseSchema>>({
    resolver: zodResolver(createPhaseSchema),
    defaultValues: {
      course: "",
      title: "",
      display_title: "",
      description: "",
      order_number: 0,
      icon_url: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof createPhaseSchema>) {
    setIsLoading(true);
    console.log("values", values);
    const formData = new FormData();
    formData.append("course", values.course);
    formData.append("title", values.title);
    formData.append("display_title", values.display_title);
    formData.append("description", values.description);
    formData.append("order_number", Number(values.order_number).toString());
    formData.append("icon_url", values.icon_url);
    const res = await createCoursePhase(formData as unknown as CreatePhase);
    if (res.success) {
      toast.success("Phase created successfully");
      router.push("/admin/courses/createPhase");
    } else {
      toast.error(res.error);
    }
    setIsLoading(false);
  }

  const tabs = [
    { label: "Create Course", path: "/admin/courses/createCourse" },
    { label: "Create Phase", path: "/admin/courses/createPhase" },
    { label: "Create Week", path: "/admin/courses/createWeek" },
    { label: "Week Component", path: "/admin/courses/createWeekComponent" },
  ];

  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="Create Phase" />
      <div className="p-6 text-black bg-white min-h-screen">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
          <BookOpen className="text-green-500" />
          Create Phase
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`pb-2 ${
                pathname === tab.path
                  ? "border-b-2 border-primary text-primary"
                  : "hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <Card className="p-6 border border-gray-200 my-5">
          {isLoadingCourses ? (
            <div className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Course Title */}
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course._id} value={course._id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phase Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Basic computer skills" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="display_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="/basic-computer-skills"
                          {...field}
                        />
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
                          placeholder="Enter phase description"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phase Order</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phase Icon</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        60×60 | jpg, jpeg, gif, png
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-green-500 text-white hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      "Create Phase"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
}
