"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
import { createWeekSchema } from "@/validations/schema";

export default function CreateWeekPage() {
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

  const form = useForm<z.infer<typeof createWeekSchema>>({
    resolver: zodResolver(createWeekSchema),
    defaultValues: {
      courseTitle: "",
      phaseName: "",
      weekName: "",
      weekTitle: "",
      groupSession: "",
      liveSession: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createWeekSchema>) {
    console.log("values", values);
  }

  const tabs = [
    { label: "Create Course", path: "/admin/courses/createCourse" },
    { label: "Create Phase", path: "/admin/courses/createPhase" },
    { label: "Create Week", path: "/admin/courses/createWeek" },
    { label: "Week Component", path: "/admin/courses/createWeekComponent" },
  ];

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
        <Calendar className="text-green-600" />
        Create Week
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-500">
        {tabs.map((tab) => (
          <Button
            variant="ghost"
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 px-1 text-sm ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-green-500"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </Button>
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
                    <FormControl>
                      <Input placeholder="Week-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weekTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Week Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Basic computer skills" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="groupSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Session</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group session" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="group 1">group 1</SelectItem>
                        <SelectItem value="group 2">group 2</SelectItem>
                        <SelectItem value="group 3">group 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Session</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group session" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="live 1">live 1</SelectItem>
                        <SelectItem value="live 2">live 2</SelectItem>
                        <SelectItem value="live 3">live 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-green-500 text-white hover:bg-orange-600"
                >
                  Save & Next →
                </Button>
              </div>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}
