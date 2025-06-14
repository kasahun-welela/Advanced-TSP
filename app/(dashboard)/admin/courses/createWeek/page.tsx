"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, Loader2 } from "lucide-react";
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
import {
  getAllCourses,
  getPhasesByCourseId,
  createWeek,
} from "@/app/actions/course";
import { Course, LiveSession, GroupSession, Phase } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { createWeekSchema } from "@/validations/schema";
import DashboardHeader from "@/components/DashboardHeader";
import { getGroupSessions, getLiveSessions } from "@/app/actions/session";

export default function CreateWeekPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isLoadingPhases, setIsLoadingPhases] = useState(false);
  const [groupSessions, setGroupSessions] = useState<GroupSession[]>([]);
  const [isLoadingGroupSessions, setIsLoadingGroupSessions] = useState(false);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [isLoadingLiveSessions, setIsLoadingLiveSessions] = useState(false);
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
    const fetchGroupSessions = async () => {
      try {
        setIsLoadingGroupSessions(true);
        const res = await getGroupSessions();
        if (res.success) {
          setGroupSessions(res.data?.data || []);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch group sessions", error);
        toast.error("Failed to fetch group sessions");
      } finally {
        setIsLoadingGroupSessions(false);
      }
    };
    const fetchLiveSessions = async () => {
      try {
        setIsLoadingLiveSessions(true);
        const res = await getLiveSessions();
        if (res.success) {
          setLiveSessions(res.data?.data || []);
          console.log("liveSessions", res.data?.data);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch live sessions", error);
        toast.error("Failed to fetch live sessions");
      } finally {
        setIsLoadingLiveSessions(false);
      }
    };

    fetchCourses();
    fetchGroupSessions();
    fetchLiveSessions();
  }, []);

  const form = useForm<z.infer<typeof createWeekSchema>>({
    resolver: zodResolver(createWeekSchema),
    defaultValues: {
      courseTitle: "",
      phaseName: "",
      weekTitle: "",
      groupSession: "",
      liveSession: "",
      order_number: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof createWeekSchema>) {
    setIsLoading(true);
    const payload = {
      phase: values.phaseName,
      title: values.weekTitle,
      description: values.weekTitle,
      group_session: values.groupSession,
      live_session: values.liveSession,
      order_number: values.order_number,
    };
    try {
      const res = await createWeek(payload);
      if (res.success) {
        toast.success("Week created successfully");
      }
    } catch (error: unknown) {
      console.error("Failed to create week", error);
      toast.error("Failed to create week");
    } finally {
      setIsLoading(false);
    }
  }

  const fetchPhases = async (courseId: string) => {
    // this for fetching phases by course id
    setIsLoadingPhases(true);
    const res = await getPhasesByCourseId(courseId);
    console.log("phases", res);
    if (res.success) {
      setPhases(res.data?.data || []);
    } else {
      toast.error(res.error);
    }
    setIsLoadingPhases(false);
  };
  const tabs = [
    { label: "Create Course", path: "/admin/courses/createCourse" },
    { label: "Create Phase", path: "/admin/courses/createPhase" },
    { label: "Create Week", path: "/admin/courses/createWeek" },
    { label: "Week Component", path: "/admin/courses/createWeekComponent" },
  ];

  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="Create Week" />
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
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
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
                        onValueChange={(value) => {
                          field.onChange(value);
                          fetchPhases(value);
                        }}
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
                      {isLoadingPhases ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
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
                            {phases.length === 0 &&
                            isLoadingPhases === false ? (
                              <p className="text-sm text-gray-500">
                                No phases found for this course
                              </p>
                            ) : (
                              phases.map((phase) => (
                                <SelectItem key={phase._id} value={phase._id}>
                                  {phase.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Week Order</FormLabel>
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
                  name="weekTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Week Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Week-1" {...field} />
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
                      {isLoadingGroupSessions ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
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
                            {groupSessions.length === 0 &&
                            isLoadingGroupSessions === false ? (
                              <p className="text-sm text-gray-500">
                                No group sessions found
                              </p>
                            ) : (
                              groupSessions.map((session) => (
                                <SelectItem
                                  key={session._id}
                                  value={session._id}
                                >
                                  {session.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      )}
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
                      {isLoadingLiveSessions ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
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
                            {liveSessions.length === 0 &&
                            isLoadingLiveSessions === false ? (
                              <p className="text-sm text-gray-500">
                                No live sessions found
                              </p>
                            ) : (
                              liveSessions.map((session) => (
                                <SelectItem
                                  key={session._id}
                                  value={session._id}
                                >
                                  {session.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      )}
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
                      <>
                        <Loader2 className="animate-spin" />
                        <span className="ml-2">Creating Week...</span>
                      </>
                    ) : (
                      "Create Week"
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
