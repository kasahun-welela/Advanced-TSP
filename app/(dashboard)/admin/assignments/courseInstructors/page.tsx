"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
        Course Instructor Assignment
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
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Form */}
      <form className="bg-white border border-gray-200 shadow rounded p-6 space-y-5 text-sm">
        {/* Select Course */}
        <div className="space-y-1">
          <Label htmlFor="selectedCourse">Select Course</Label>
          <Select
            value={formData.selectedCourse}
            onValueChange={(value) => handleChange("selectedCourse", value)}
          >
            <SelectTrigger id="selectedCourse">
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
          <Label htmlFor="selectedTeamMember">Select Team Member</Label>
          <Select
            value={formData.selectedTeamMember}
            onValueChange={(value) => handleChange("selectedTeamMember", value)}
          >
            <SelectTrigger id="selectedTeamMember">
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
          <Button
            type="submit"
            className="bg-green-500 hover:bg-orange-600 text-white"
          >
            Assign as Instructor
          </Button>
        </div>
      </form>
    </div>
  );
}
