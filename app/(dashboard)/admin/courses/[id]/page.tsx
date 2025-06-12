"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import DashboardHeader from "@/components/DashboardHeader";
import { useParams } from "next/navigation";
import { getCourseById } from "@/app/actions/course";
import { Course } from "@/interfaces";
import { toast } from "sonner";

function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseById(id as string);
        if (res.success && res.data?.course) {
          setCourse(res.data.course);
        } else {
          setError(res.error || "Failed to fetch course");
          toast.error(res.error || "Failed to fetch course");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch course");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  const content = isLoading ? (
    <>
      <div className="flex items-center gap-4">
        <Skeleton className="w-32 h-20 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Skeleton className="h-24 w-full mb-4" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-20 rounded overflow-hidden border">
          <Image
            src={course?.thumbnail || ""}
            alt={course?.title || ""}
            fill
            className="object-cover"
            sizes="128px"
            priority
          />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-primary">
            {course?.title}
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <Badge variant="outline">{course?.difficulty_level}</Badge>
            <Badge variant="outline">{course?.status}</Badge>
            <Badge variant="outline">{course?.course_type}</Badge>
            <Badge variant="outline">{course?.delivery_method}</Badge>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-gray-700 mb-4">{course?.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Price:</span> ${course?.price}
          </div>
          <div>
            <span className="font-semibold">Duration:</span>{" "}
            {course?.duration_months} months
          </div>
          <div>
            <span className="font-semibold">Created by:</span>{" "}
            {course?.creator?.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {course?.creator?.email}
          </div>
          <div>
            <span className="font-semibold">Created at:</span>{" "}
            {course?.created_at
              ? new Date(course.created_at).toLocaleDateString()
              : "N/A"}
          </div>
          <div>
            <span className="font-semibold">Active:</span>{" "}
            {course?.is_active ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="Course Detail" />
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:mx-0 md:ml-12">
        <Card className="shadow-lg">
          <CardHeader>{content}</CardHeader>
        </Card>
      </div>
    </>
  );
}

export default CourseDetailPage;
