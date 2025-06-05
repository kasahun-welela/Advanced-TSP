"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CourseInstructorPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedTeamMember: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { label: "Manage Batches", path: "/admin/batch/createBatch" },
    { label: "Manage Groups", path: "/admin/batch/createGroup" },
    { label: "Batch Instructors", path: "/admin/batch/batchInstructors" },
    { label: "Course Instructors", path: "/admin/batch/courseInstructors" },
  ];

  return (
    <div className="p-6 text-black">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <UserPlus className="text-green-500" />
        Course Instructor Assignment
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 transition-colors duration-200 ease-in-out ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-green-500"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <Card className="p-6 space-y-5 bg-white text-black border border-gray-300 shadow">
        {/* Select Course */}
        <div className="space-y-1">
          <Label>Select Course</Label>
          <Select
            value={formData.selectedCourse}
            onValueChange={(value) => handleChange("selectedCourse", value)}
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

        {/* Select Team Member */}
        <div className="space-y-1">
          <Label>Select Team Member</Label>
          <Select
            value={formData.selectedTeamMember}
            onValueChange={(value) => handleChange("selectedTeamMember", value)}
          >
            <SelectTrigger className="bg-white border border-gray-300 text-black">
              <SelectValue placeholder="Select Team Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Doe">John Doe</SelectItem>
              <SelectItem value="Jane Smith">Jane Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assign Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button className="bg-green-500 hover:bg-orange-600 text-white">
            Assign as Instructor
          </Button>
        </div>
      </Card>
    </div>
  );
}
