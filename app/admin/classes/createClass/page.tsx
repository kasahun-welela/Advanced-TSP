"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateClassPage() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Create Class", path: "/admin/classes/createClass" },
    { label: "Create Class Video", path: "/admin/classes/addVideo" },
    { label: "Create Checklist Item", path: "/admin/classes/createChecklist" },
    {
      label: "Create Class Component",
      path: "/admin/classes/createClassComponent",
    },
  ];

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekTitle: "",
    topic: "",
    description: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 text-black bg-white rounded shadow-md">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <LayoutTemplate className="text-green-600" />
        Create Class
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-medium text-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 ${
              pathname === tab.path
                ? "border-b-2 border-green-600 text-green-600"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="space-y-6 text-sm">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Course Title</Label>
            <Select
              value={formData.courseTitle}
              onValueChange={(val) => handleChange("courseTitle", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fullstack Web Application Development">
                  Fullstack Web Application Development
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Phase Title</Label>
            <Select
              value={formData.phaseTitle}
              onValueChange={(val) => handleChange("phaseTitle", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phase 1: Building static websites using HTML, CSS & Bootstrap">
                  Phase 1: Building static websites using HTML, CSS & Bootstrap
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Week Name</Label>
            <Select
              value={formData.weekTitle}
              onValueChange={(val) => handleChange("weekTitle", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Course Preparation Week: Before you start the class">
                  Course Preparation Week: Before you start the class
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Class Topic</Label>
            <Input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              placeholder="e.g. Basic computer skills - part I"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={6}
            placeholder="Enter topic description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {/* <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            Save & Create New Class +
          </Button> */}
          <Button className="bg-green-500 hover:bg-orange-600 text-white">
            Save & Next →
          </Button>
        </div>
      </form>
    </div>
  );
}
