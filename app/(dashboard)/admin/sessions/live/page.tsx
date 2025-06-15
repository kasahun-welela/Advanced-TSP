"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Video, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createLiveSessionSchema } from "@/validations/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getLiveSessions } from "@/app/actions/session";
import { GetLiveSession } from "@/interfaces";

export default function CreateLiveSessionPage() {
  const [liveSessions, setLiveSessions] = useState<GetLiveSession[]>([]);
  useEffect(() => {
    const fetchLiveSessions = async () => {
      const res = await getLiveSessions();
      if (res.success) {
        setLiveSessions(res.data.data);
        console.log("live sessions", res.data.data);
      }
    };
    fetchLiveSessions();
  }, []);

  const tabs = [
    { label: "Live Session", path: "/admin/sessions/live" },
    { label: "Group Sessions", path: "/admin/sessions/group" },
  ];

  const form = useForm<z.infer<typeof createLiveSessionSchema>>({
    resolver: zodResolver(createLiveSessionSchema),
    defaultValues: {
      course: "",
      batch: "",
      phase: "",
      week: "",
      session_type: "",
      zoom_link: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createLiveSessionSchema>) => {
    console.log(values);
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <Video className="text-green-500" />
        Create Live Session
      </h1>
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-4 border-b border-gray-200 ">
        {tabs.map((tab) => (
          <Link key={tab.path} href={tab.path}>
            {tab.label}
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Live Session</CardTitle>
        </CardHeader>
        <CardContent>
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        // fetchPhases(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="course 1">course 1</SelectItem>
                        <SelectItem value="course 2">course 2</SelectItem>
                        <SelectItem value="course 3">course 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Select Phase */}
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Batch</FormLabel>

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
                name="phase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phase Name</FormLabel>
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
                name="week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Week Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="class 1">class 1</SelectItem>
                        <SelectItem value="class 2">class 2</SelectItem>
                        <SelectItem value="class 3">class 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="session_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a session" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="session 1">session 1</SelectItem>
                        <SelectItem value="session 2">session 2</SelectItem>
                        <SelectItem value="session 3">session 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zoom_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zoom Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Zoom Link" {...field} />
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
                  Create Live Session
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* Sessions Table */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Live Session Links</h2>

        <Table>
          <TableCaption>A list of live sessions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Created By</TableHead>
              <TableHead>Session Title</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Live Session Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {liveSessions.map((session) => (
              <TableRow key={session._id}>
                <TableCell className="font-medium">
                  {session.instructor.name}
                </TableCell>
                <TableCell>{session.title}</TableCell>
                <TableCell>{session.batch.name}</TableCell>
                <TableCell>
                  <Link
                    href={session.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {session.meeting_link}
                  </Link>
                </TableCell>
                <TableCell>{session.status}</TableCell>
                <TableCell>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="flex items-center gap-1">
            <ChevronLeft size={16} /> Previous
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
