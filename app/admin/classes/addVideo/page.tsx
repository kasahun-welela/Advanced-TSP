"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { label: "Create Class", path: "/admin/classes/createClass" },
  { label: "Create Class Video", path: "/admin/classes/addVideo" },
  { label: "Create Checklist Item", path: "/admin/classes/createChecklist" },
  {
    label: "Create Class Component",
    path: "/admin/classes/createClassComponent",
  },
];

export default function CreateClassVideoPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekTitle: "",
    classTitle: "",
    videoTitle: "",
    videoUrl: "",
    videoLength: 0,
    isDisabled: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [target.name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <Video className="text-green-600" />
        Add Class Video
      </h1>

      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-500">
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

      <form onSubmit={handleSubmit}>
        <Card className="shadow border-gray-200">
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courseTitle" className="mb-1 block">
                  Selected Course
                </Label>
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
                <Label htmlFor="phaseTitle" className="mb-1 block">
                  Selected Phase
                </Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weekTitle" className="mb-1 block">
                  Selected Week
                </Label>
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
                <Label htmlFor="classTitle" className="mb-1 block">
                  Selected Class
                </Label>
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

            <div>
              <Label htmlFor="videoTitle" className="mb-1 block">
                Class Video Title
              </Label>
              <Input
                id="videoTitle"
                name="videoTitle"
                type="text"
                placeholder="e.g. Basics of computer skills - Part 1"
                value={formData.videoTitle}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="videoUrl" className="mb-1 block">
                  Video Link
                </Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="text"
                  placeholder="https://www.youtube.com"
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="videoLength" className="mb-1 block">
                  Video Length (min)
                </Label>
                <Input
                  id="videoLength"
                  name="videoLength"
                  type="number"
                  value={formData.videoLength}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDisabled"
                checked={formData.isDisabled}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isDisabled: !!checked }))
                }
              />
              <Label htmlFor="isDisabled">Disable Video</Label>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                className="bg-green-500 hover:bg-orange-600 text-white"
                type="submit"
              >
                Save & Next →
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
