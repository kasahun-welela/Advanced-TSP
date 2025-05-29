"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FilePlus2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddWeekContentPage() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Add Week Content", path: "/admin/content/addWeek" },
    { label: "Add Class Content", path: "/admin/content/addClass" },
  ];

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedPhase: "",
    selectedWeek: "",
    selectedComponent: "",
    contentTitle: "",
    iconType: "",
    contentType: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <FilePlus2 className="text-green-600" />
        Add Week Content
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-500">
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

      {/* Form */}
      <form className="bg-white border border-gray-200 p-6 rounded-lg shadow space-y-5 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select Course */}
          <div>
            <Label className="mb-1 block">Select Course</Label>
            <select
              name="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            >
              <option value="">Select Course</option>
              <option value="Fullstack Web Dev">Fullstack Web Dev</option>
            </select>
          </div>

          {/* Select Phase */}
          <div>
            <Label className="mb-1 block">Select Phase</Label>
            <select
              name="selectedPhase"
              value={formData.selectedPhase}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            >
              <option value="">Select Phase</option>
              <option value="Phase 1">Phase 1</option>
            </select>
          </div>

          {/* Select Week */}
          <div>
            <Label className="mb-1 block">Select Week</Label>
            <select
              name="selectedWeek"
              value={formData.selectedWeek}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            >
              <option value="">Select Week</option>
              <option value="Week 1">Week 1</option>
              <option value="Week 2">Week 2</option>
            </select>
          </div>

          {/* Select Component */}
          <div>
            <Label className="mb-1 block">Select Component</Label>
            <select
              name="selectedComponent"
              value={formData.selectedComponent}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            >
              <option value="">Select Component</option>
              <option value="Lecture">Lecture</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>
        </div>

        {/* Content Title */}
        <div>
          <Label className="mb-1 block">Content Title</Label>
          <Input
            type="text"
            name="contentTitle"
            value={formData.contentTitle}
            onChange={handleChange}
            placeholder="e.g. Introduction to Git"
          />
        </div>

        {/* Icon & Content Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block">Icon Type</Label>
            <Input
              type="text"
              name="iconType"
              value={formData.iconType}
              onChange={handleChange}
              placeholder="e.g. book, video"
            />
          </div>

          <div>
            <Label className="mb-1 block">Content Type</Label>
            <select
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            >
              <option value="">Choose Type</option>
              <option value="Reading">Reading</option>
              <option value="Video">Video</option>
              <option value="Quiz">Quiz</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label className="mb-1 block">Description</Label>
          <Textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter content description"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-orange-700 text-white"
          >
            Save & Create New Content
          </Button>
        </div>
      </form>
    </div>
  );
}
