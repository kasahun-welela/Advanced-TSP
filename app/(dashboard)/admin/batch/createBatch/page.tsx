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

export default function CreateBatchPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    selectedCourse: "",
    batchName: "",
    description: "",
    liveClassDays: "",
    liveClassHourStart: "",
    liveClassHourEnd: "",
    batchFullName: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    <div className="p-6 bg-white text-black">
      <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <Layers className="text-green-600" />
        Create Batch
      </h1>

      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 transition-colors duration-200 ease-in-out ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-green-600"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form className="bg-white p-6 rounded shadow border border-gray-200 space-y-5 text-sm">
        <div>
          <Label>Select Course</Label>
          <Select
            name="selectedCourse"
            value={formData.selectedCourse}
            onValueChange={(value) =>
              setFormData({ ...formData, selectedCourse: value })
            }
          >
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

        <div>
          <Label>Batch Name</Label>
          <Input
            name="batchName"
            value={formData.batchName}
            onChange={handleChange}
            placeholder="e.g. June-2024"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter batch description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Live Class Days</Label>
            <Select
              name="liveClassDays"
              value={formData.liveClassDays}
              onValueChange={(value) =>
                setFormData({ ...formData, liveClassDays: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mon, Wed, Fri">Mon, Wed, Fri</SelectItem>
                <SelectItem value="Tue, Thu">Tue, Thu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Live Class Hour</Label>
            <div className="flex gap-2">
              <Input
                type="time"
                name="liveClassHourStart"
                value={formData.liveClassHourStart}
                onChange={handleChange}
              />
              <Input
                type="time"
                name="liveClassHourEnd"
                value={formData.liveClassHourEnd}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Batch Full Name</Label>
          <Input
            name="batchFullName"
            value={formData.batchFullName}
            onChange={handleChange}
            placeholder="e.g. June 6th - 2024"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label>Upload Batch Flyer</Label>
          <Input type="file" accept=".jpg,.jpeg,.png" />
          <p className="text-xs text-gray-500 mt-1">
            60×60 px. JPG, JPEG, PNG only. No text on image.
          </p>
        </div>

        <div>
          <Label>Batch Full Schedule (PDF)</Label>
          <Input type="file" accept=".pdf" />
          <p className="text-xs text-gray-500 mt-1">Less than 10 MB</p>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="submit"
            className="bg-green-500 hover:bg-orange-600 text-white"
          >
            Save & Next →
          </Button>
        </div>
      </form>
    </div>
  );
}
