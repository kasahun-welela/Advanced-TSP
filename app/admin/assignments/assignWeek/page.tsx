"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CalendarCheck2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AssignWeekPage() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Assign Week", path: "/admin/assignments/assignWeek" },
    { label: "Batch Instructors", path: "/admin/assignments/batchInstructors" },
    {
      label: "Course Instructors",
      path: "/admin/assignments/courseInstructors",
    },
  ];

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedPhase: "",
    selectedWeek: "",
    selectedClass: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <CalendarCheck2 className="text-green-500" />
        Assign Week
      </h1>

      {/* Tabs Navigation */}
      <nav className="flex space-x-6 border-b border-gray-300 mb-6 text-sm font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 transition-colors duration-200 ease-in-out ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-black"
            }`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Form */}
      <form className="bg-white p-6 rounded shadow border border-gray-200 space-y-5 text-sm">
        {/* Select Course */}
        <div className="space-y-1">
          <Label>Select Course</Label>
          <Select
            value={formData.selectedCourse}
            onValueChange={(value) => handleChange("selectedCourse", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Choose Course --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Course1">Course 1</SelectItem>
              <SelectItem value="Course2">Course 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Select Phase */}
        <div className="space-y-1">
          <Label>Select Phase</Label>
          <Select
            value={formData.selectedPhase}
            onValueChange={(value) => handleChange("selectedPhase", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Choose Phase --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phase1">Phase 1</SelectItem>
              <SelectItem value="Phase2">Phase 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Select Week */}
        <div className="space-y-1">
          <Label>Select Week</Label>
          <Select
            value={formData.selectedWeek}
            onValueChange={(value) => handleChange("selectedWeek", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Choose Week --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Week1">Week 1</SelectItem>
              <SelectItem value="Week2">Week 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Select Class */}
        <div className="space-y-1">
          <Label>Select Class</Label>
          <Select
            value={formData.selectedClass}
            onValueChange={(value) => handleChange("selectedClass", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Choose Class --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Class A">Class A</SelectItem>
              <SelectItem value="Class B">Class B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assign Week Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="submit"
            className="bg-green-500 hover:bg-orange-600 text-white"
          >
            Assign Week
          </Button>
        </div>
      </form>
    </div>
  );
}
