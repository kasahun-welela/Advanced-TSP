"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ListChecks } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";

export default function CreateChecklistPage() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Create Class", path: "/admin/classes/createClass" },
    { label: "Create Class Video", path: "/admin/classes/createClassVideo" },
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
    classTitle: "",
    checklistTitle: "",
    briefNote: "",
    descriptionNote: "",
    referenceLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <DashboardHeader
        previousPage="Dashboard"
        currentPage="Create Check List"
      />
      <div className="p-6 text-black bg-white min-h-screen">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-green-600 mb-2 flex items-center gap-2">
          <ListChecks className="text-green-500" />
          Create Checklist
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Create the class roadmap of your course with details.
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-500">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`pb-2 ${
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
        <Card className="shadow border border-gray-200">
          <CardContent className="space-y-6 p-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Selected Course</Label>
                <Select
                  value={formData.courseTitle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, courseTitle: value }))
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
                <Label className="mb-1 block">Selected Phase</Label>
                <Select
                  value={formData.phaseTitle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, phaseTitle: value }))
                  }
                >
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
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Selected Week</Label>
                <Select
                  value={formData.weekTitle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, weekTitle: value }))
                  }
                >
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

              <div>
                <Label className="mb-1 block">Selected Class Topic</Label>
                <Select
                  value={formData.classTitle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, classTitle: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic computer skills - part I">
                      Basic computer skills - part I
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Checklist Title */}
            <div>
              <Label className="mb-1 block">Checklist Item Title</Label>
              <Input
                type="text"
                name="checklistTitle"
                placeholder="Enter checklist item title as question?"
                value={formData.checklistTitle}
                onChange={handleChange}
              />
            </div>

            {/* Brief Note */}
            <div>
              <Label className="mb-1 block">Brief HTML Note</Label>
              <Textarea
                name="briefNote"
                rows={5}
                value={formData.briefNote}
                onChange={handleChange}
                placeholder="Enter checklist item brief html note"
              />
            </div>

            {/* Description Note */}
            <div>
              <Label className="mb-1 block">Description Note</Label>
              <Textarea
                name="descriptionNote"
                rows={5}
                value={formData.descriptionNote}
                onChange={handleChange}
                placeholder="Enter checklist item description note (optional)"
              />
            </div>

            {/* Reference Link */}
            <div>
              <Label className="mb-1 block">Reference Link</Label>
              <Input
                type="text"
                name="referenceLink"
                placeholder="https://www.youtube.com/watch?v=bqL4ZbLYeyY"
                value={formData.referenceLink}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              {/* <Button variant="outline" type="submit" className="border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500">
              Save & Create Checklist +
            </Button> */}
              <Button
                type="submit"
                className="bg-green-500 hover:bg-orange-600 text-white"
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
