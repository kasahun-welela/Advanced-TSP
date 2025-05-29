"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePhasePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseName: "",
    phaseTitle: "",
    phaseUrl: "",
    description: "",
    icon: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, courseTitle: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, icon: file }));
  };

  const tabs = [
    { label: "Create Course", path: "/dashboard/courses/createCourse" },
    { label: "Create Phase", path: "/dashboard/courses/createPhase" },
    { label: "Create Week", path: "/dashboard/courses/createWeek" },
    { label: "Week Component", path: "/dashboard/courses/createWeekComponent" },
  ];

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <BookOpen className="text-green-500" />
        Create Phase
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
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
      <Card className="p-6 border border-gray-200 space-y-5">
        {/* Course Title */}
        <div>
          <Label className="mb-1 text-gray-800">Course Title</Label>
          <Select
            value={formData.courseTitle}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="bg-white text-black border border-gray-300">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fullstack Web Application Development">
                Fullstack Web Application Development
              </SelectItem>
              {/* Dynamically render more options as needed */}
            </SelectContent>
          </Select>
        </div>

        {/* Phase Name & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 text-gray-800">Phase Name</Label>
            <Input
              name="phaseName"
              value={formData.phaseName}
              onChange={handleChange}
              placeholder="Phase-1"
            />
          </div>
          <div>
            <Label className="mb-1 text-gray-800">Phase Title</Label>
            <Input
              name="phaseTitle"
              value={formData.phaseTitle}
              onChange={handleChange}
              placeholder="Basic computer skills"
            />
          </div>
        </div>

        {/* Phase URL */}
        <div>
          <Label className="mb-1 text-gray-800">Phase URL</Label>
          <Input
            name="phaseUrl"
            value={formData.phaseUrl}
            onChange={handleChange}
            placeholder="/basic-computer-skills"
          />
        </div>

        {/* Description */}
        <div>
          <Label className="mb-1 text-gray-800">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter phase description"
          />
        </div>

        {/* File Upload */}
        <div>
          <Label className="mb-1 text-gray-800">Phase Icon</Label>
          <Input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            60×60 | jpg, jpeg, gif, png
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {/* <Button type="submit" variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
            Save & Create New Phase
          </Button> */}
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-orange-600"
          >
            Save & Next →
          </Button>
        </div>
      </Card>
    </div>
  );
}
