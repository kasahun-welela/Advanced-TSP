"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateBatchInstructorPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    className: "",
    instructor: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { label: "Assign Week", path: "/admin/assignments/assignWeek" },
    {
      label: "Batch Instructors",
      path: "/admin/assignments/batchInstructors",
    },
    {
      label: "Course Instructors",
      path: "/admin/assignments/courseInstructors",
    },
  ];

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <UserPlus className="text-green-500" />
        Assign Batch Instructor
      </h1>

      {/* Tab Navigation */}
      <nav className="flex space-x-6 border-b border-gray-300 mb-6 text-sm font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            type="button"
            className={`pb-2 transition-colors duration-200 ease-in-out ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-gree-600"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Form */}
      <form className="bg-white p-6 rounded shadow border border-gray-200 space-y-5 text-sm">
        {/* Select Course */}
        <div className="space-y-1">
          <Label htmlFor="course">Select Course</Label>
          <Select
            value={formData.course}
            onValueChange={(value) => handleChange("course", value)}
          >
            <SelectTrigger id="course">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fullstack Web Application Development">
                Fullstack Web Application Development
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Select Batch */}
        <div className="space-y-1">
          <Label htmlFor="batch">Select Batch</Label>
          <Select
            value={formData.batch}
            onValueChange={(value) => handleChange("batch", value)}
          >
            <SelectTrigger id="batch">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="June-2024">June-2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Class Name */}
        <div className="space-y-1">
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            name="className"
            value={formData.className}
            onChange={(e) => handleChange("className", e.target.value)}
            placeholder="e.g. Frontend Essentials"
            type="text"
          />
        </div>

        {/* Instructor */}
        <div className="space-y-1">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={(e) => handleChange("instructor", e.target.value)}
            placeholder="Enter instructor name"
            type="text"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {/* <Button type="button" variant="outline" className="text-blue-600 hover:text-blue-700 border-blue-600">
            Save as Draft
          </Button> */}
          <Button
            type="submit"
            className="bg-green-500 hover:bg-orange-600 text-white"
          >
            Save & Next →
          </Button>
        </div>
      </form>
    </div>
  );
}
