"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DashboardHeader from "@/components/DashboardHeader";

export default function CreateClassComponentPage() {
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
    iconType: "",
    componentTitle: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <DashboardHeader
        previousPage="Dashboard"
        currentPage="Create Class Component"
      />
      <div className="p-6 text-black bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-green-500 mb-2 flex items-center gap-2">
          <LayoutList className="text-green-500" />
          Create Class Component
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Create the roadmap of your week component with details.
        </p>

        <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`pb-2 transition-all duration-200 ${
                pathname === tab.path
                  ? "border-b-2 border-green-500 text-green-500"
                  : "hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Card className="bg-white border border-gray-300">
          <CardContent className="p-6 space-y-6 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Selected Course</Label>
                <Select
                  name="courseTitle"
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
                <Label className="mb-1">Selected Phase</Label>
                <Select
                  name="phaseTitle"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Selected Week</Label>
                <Select
                  name="weekTitle"
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
                <Label className="mb-1">Selected Class</Label>
                <Select
                  name="classTitle"
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

            <div>
              <Label className="mb-1">Icon Type</Label>
              <Select
                name="iconType"
                value={formData.iconType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, iconType: value }))
                }
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

            <div>
              <Label className="mb-1">Component Title</Label>
              <Input
                type="text"
                name="componentTitle"
                value={formData.componentTitle}
                onChange={handleChange}
                placeholder="Todo list: Enter component title"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              {/* <Button variant="outline" type="submit">
              Save & Create Component +
            </Button> */}
              <Button
                type="submit"
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
