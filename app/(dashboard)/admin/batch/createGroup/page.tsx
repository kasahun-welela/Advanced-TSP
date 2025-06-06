"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateGroupPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedBatch: "",
    groupName: "",
    description: "",
    classHoursEST: "",
    classHoursET: "",
    classDay: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { label: "Create Batch", path: "/admin/batch/createBatch" },
    { label: "Create Group", path: "/admin/batch/createGroup" },
    { label: "Batch Instructors", path: "/admin/batch/batchInstructors" },
    { label: "Course Instructors", path: "/admin/batch/courseInstructors" },
  ];

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <Layers className="text-green-500" />
        Create Group
      </h1>

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

      <form className="bg-white p-6 rounded shadow border border-gray-200 space-y-5 text-sm">
        {/* Select Course */}
        <div>
          <Label className="mb-1">Select Course</Label>
          <Select
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, selectedCourse: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Course 1">Course 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Select Batch */}
        <div>
          <Label className="mb-1">Select Batch</Label>
          <Select
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, selectedBatch: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Batch A">Batch A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group Name */}
        <div>
          <Label htmlFor="groupName" className="mb-1">
            Group Name
          </Label>
          <Input
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="e.g. Group 1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter group description"
          />
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="classHoursEST">Class Hours (EST)</Label>
            <Input
              type="time"
              id="classHoursEST"
              name="classHoursEST"
              value={formData.classHoursEST}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="classHoursET">Class Hours (ET)</Label>
            <Input
              type="time"
              id="classHoursET"
              name="classHoursET"
              value={formData.classHoursET}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Class Day */}
        <div>
          <Label className="mb-1">Class Day</Label>
          <Select
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, classDay: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mon, Wed, Fri">Mon, Wed, Fri</SelectItem>
              <SelectItem value="Tue, Thu">Tue, Thu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {/* <Button variant="outline" type="button">
            Save as Draft
          </Button> */}
          <Button
            className="bg-green-500 hover:bg-orange-600 text-white"
            type="submit"
          >
            Save & Next →
          </Button>
        </div>
      </form>
    </div>
  );
}
