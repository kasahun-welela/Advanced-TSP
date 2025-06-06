"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/DashboardHeader";

export default function CreateWeekComponentPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekTitle: "",
    iconType: "",
    componentTitle: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { label: "Create Course", path: "/dashboard/courses/createCourse" },
    { label: "Create Phase", path: "/dashboard/courses/createPhase" },
    { label: "Create Week", path: "/dashboard/courses/createWeek" },
    { label: "Week Component", path: "/dashboard/courses/createWeekComponent" },
  ];

  return (
    <>
      <DashboardHeader
        previousPage="Dashboard"
        currentPage="Create week component"
      />
      <div className="p-6 text-black bg-white min-h-screen">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
          <LayoutList className="text-green-500" />
          Create Week Component
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6 text-sm font-semibold text-gray-500">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`pb-2 ${
                pathname === tab.path
                  ? "border-b-2 border-green-500 text-green-600"
                  : "hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <Card className="border-gray-200">
          <CardContent className="p-6 space-y-6">
            {/* Course Title */}
            <div className="space-y-1">
              <Label>Selected Course</Label>
              <Select onValueChange={(val) => handleChange("courseTitle", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fullstack Web Application Development">
                    Fullstack Web Application Development
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phase Title */}
            <div className="space-y-1">
              <Label>Selected Phase</Label>
              <Select onValueChange={(val) => handleChange("phaseTitle", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phase 1: Building static websites using HTML, CSS & Bootstrap">
                    Phase 1: Building static websites using HTML, CSS &
                    Bootstrap
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Week Title */}
            <div className="space-y-1">
              <Label>Selected Week</Label>
              <Select onValueChange={(val) => handleChange("weekTitle", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Course Preparation Week: Before you start the class">
                    Course Preparation Week: Before you start the class
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add Week Component */}
            <div>
              <p className="font-medium mb-2">Add Week Component</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Icon Type */}
                <div className="space-y-1">
                  <Label>Icon Type</Label>
                  <Select
                    onValueChange={(val) => handleChange("iconType", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Quiz">Quiz</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Component Title */}
                <div className="space-y-1">
                  <Label>Component Title</Label>
                  <Input
                    name="componentTitle"
                    value={formData.componentTitle}
                    onChange={(e) =>
                      handleChange("componentTitle", e.target.value)
                    }
                    placeholder="Enter component title"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              {/* <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Save & Create +
            </Button> */}
              <Button
                variant="destructive"
                className="bg-green-500 hover:bg-orange-600"
              >
                Save & Next →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
