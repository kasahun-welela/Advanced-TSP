"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FilePlus2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function AddClassContentPage() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Add Week Content", path: "/admin/content/addWeek" },
    { label: "Add Class Content", path: "/admin/content/addClass" },
  ];

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedWeek: "",
    selectedComponent: "",
    contentTitle: "",
    iconType: "",
    contentType: "",
    description: "",
  });

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="p-6 text-black">
      {/* Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <FilePlus2 className="text-green-500" />
        Add Class Content
      </h1>

      {/* Tabs */}
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
      <Card className="bg-white text-black p-6 border border-gray-300 shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectItem value="Fullstack Web Dev">
                  Fullstack Web Dev
                </SelectItem>
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
              <SelectTrigger className="bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Select Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Week 1">Week 1</SelectItem>
                <SelectItem value="Week 2">Week 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Select Component */}
          <div className="space-y-1">
            <Label>Select Component</Label>
            <Select
              value={formData.selectedComponent}
              onValueChange={(value) =>
                handleChange("selectedComponent", value)
              }
            >
              <SelectTrigger className="bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Select Component" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lecture">Lecture</SelectItem>
                <SelectItem value="Assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Title */}
          <div className="space-y-1">
            <Label>Content Title</Label>
            <Input
              name="contentTitle"
              value={formData.contentTitle}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="e.g. Class Overview"
              className="bg-white border border-gray-300 text-black"
            />
          </div>

          {/* Icon Type */}
          <div className="space-y-1">
            <Label>Icon Type</Label>
            <Input
              name="iconType"
              value={formData.iconType}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="e.g. book, video"
              className="bg-white border border-gray-300 text-black"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-1">
            <Label>Content Type</Label>
            <Select
              value={formData.contentType}
              onValueChange={(value) => handleChange("contentType", value)}
            >
              <SelectTrigger className="bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Choose Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reading">Reading</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Enter content description"
            className="bg-white border border-gray-300 text-black"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button className="bg-green-500 hover:bg-orange-600 text-white">
            Save & Create New Content
          </Button>
        </div>
      </Card>
    </div>
  );
}
