"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

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
    { label: "Create Batch", path: "/admin/batch/createBatch" },
    { label: "Create Group", path: "/admin/batch/createGroup" },
    { label: "Batch Instructors", path: "/admin/batch/batchInstructors" },
    { label: "Course Instructors", path: "/admin/batch/courseInstructors" },
  ];

  return (
    <div className="p-6 text-black">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <UserPlus className="text-green-500" />
        Assign Batch Instructor
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 transition-colors duration-200 ease-in-out ${
              pathname === tab.path
                ? "border-b-2 border-green-600 text-green-600"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <Card className="p-6 space-y-5 bg-white text-black border border-gray-300 shadow">
        {/* Select Course */}
        <div className="space-y-1">
          <Label>Select Course</Label>
          <Select
            value={formData.course}
            onValueChange={(value) => handleChange("course", value)}
          >
            <SelectTrigger className="bg-white border border-gray-300 text-black">
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
          <Label>Select Batch</Label>
          <Select
            value={formData.batch}
            onValueChange={(value) => handleChange("batch", value)}
          >
            <SelectTrigger className="bg-white border border-gray-300 text-black">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="June-2024">June-2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Class Name */}
        <div className="space-y-1">
          <Label>Class Name</Label>
          <Input
            type="text"
            name="className"
            placeholder="e.g. Frontend Essentials"
            value={formData.className}
            onChange={(e) => handleChange("className", e.target.value)}
            className="bg-white border border-gray-300 text-black"
          />
        </div>

        {/* Instructor */}
        <div className="space-y-1">
          <Label>Instructor</Label>
          <Input
            type="text"
            name="instructor"
            placeholder="Enter instructor name"
            value={formData.instructor}
            onChange={(e) => handleChange("instructor", e.target.value)}
            className="bg-white border border-gray-300 text-black"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {/* <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Save as Draft
          </Button> */}
          <Button className="bg-green-600 hover:bg-orange-700 text-white">
            Save & Next →
          </Button>
        </div>
      </Card>
    </div>
  );
}
