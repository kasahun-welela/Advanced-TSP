"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { getAllCourses } from "@/app/actions/course";
import { Course } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { createClassSchema } from "@/validations/schema";
import DashboardHeader from "@/components/DashboardHeader";

export default function CreateClassPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

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

  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      courseTitle: "",
      phaseName: "",
      weekName: "",
      classTopic: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createClassSchema>) {
    console.log("values", values);
  }

  const tabs = [
    { label: "Create Class", path: "/admin/classes/createClass" },
    { label: "Create Class Video", path: "/admin/classes/addVideo" },
    { label: "Create Checklist Item", path: "/admin/classes/createChecklist" },
    {
      label: "Create Class Component",
      path: "/admin/classes/createClassComponent",
    },
  ];

  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="Create Class" />
      <div className="p-6 text-black ">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
          <LayoutTemplate className="text-green-600" />
          Create Class
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-medium text-gray-500">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`pb-2 ${
                pathname === tab.path
                  ? "border-b-2 border-green-600 text-green-600"
                  : "hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
                <Skeleton className="h-10 w-32" />
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
                  name="courseTitle"
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
                {/* Select Phase */}
                <FormField
                  control={form.control}
                  name="phaseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Phase</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a phase" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phase 1">phase 1</SelectItem>
                          <SelectItem value="phase 2">phase 2</SelectItem>
                          <SelectItem value="phase 3">phase 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weekName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Week Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a week name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="week 1">week 1</SelectItem>
                          <SelectItem value="week 2">week 2</SelectItem>
                          <SelectItem value="week 3">week 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="classTopic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Class Topic" {...field} />
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
                          placeholder="Enter class description"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-1 md:col-span-2 flex justify-center gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/80"
                  >
                    Save & Next →
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
