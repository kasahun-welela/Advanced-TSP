"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function CreateCourseWeekPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekName: "",
    weekTitle: "",
    groupSession: "",
    liveSession: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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

      {/* Form */}
      <Card className="p-6 space-y-6 border border-gray-200 shadow-sm">
        {/* Course Title */}
        <div className="space-y-1">
          <Label>Course Title</Label>
          <Select onValueChange={(value) => handleChange("courseTitle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Course Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fullstack Web Application Development">
                Fullstack Web Application Development
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Selected Phase */}
        <div className="space-y-1">
          <Label>Selected Phase</Label>
          <Select onValueChange={(value) => handleChange("phaseTitle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phase 1: Building static websites using HTML, CSS & Bootstrap">
                Phase 1: Building static websites using HTML, CSS & Bootstrap
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Week Name */}
        <div className="space-y-1">
          <Label>Week Name</Label>
          <Input
            name="weekName"
            value={formData.weekName}
            onChange={(e) => handleChange("weekName", e.target.value)}
            placeholder="Week 1"
          />
        </div>

        {/* Week Title */}
        <div className="space-y-1">
          <Label>Week Title</Label>
          <Input
            name="weekTitle"
            value={formData.weekTitle}
            onChange={(e) => handleChange("weekTitle", e.target.value)}
            placeholder="Basic computer skills week"
          />
        </div>

        {/* Group Sessions */}
        <div className="space-y-1">
          <Label>Group Sessions</Label>
          <Select
            onValueChange={(value) => handleChange("groupSession", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Group Sessions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Session A">Session A</SelectItem>
              <SelectItem value="Session B">Session B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Live Sessions */}
        <div className="space-y-1">
          <Label>Live Sessions</Label>
          <Select onValueChange={(value) => handleChange("liveSession", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Live Sessions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Live Session 1">Live Session 1</SelectItem>
              <SelectItem value="Live Session 2">Live Session 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {/* <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Save & Create New Week +
          </Button> */}
          <Button
            type="submit"
            className="bg-green-500 hover:bg-orange-600 text-white"
          >
            Save & Next →
          </Button>
        </div>
      </Card>
    </div>
  );
}
