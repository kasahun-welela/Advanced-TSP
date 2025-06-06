"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function CompletionPercentagePage() {
  const pathname = usePathname();

  const tabs = [
    { label: "Checklist", path: "/admin/reports/checklist" },
    { label: "Watched Sessions", path: "/admin/reports/watched" },
    { label: "Attendance", path: "/admin/reports/attendance" },
    { label: "Completion", path: "/admin/reports/completion" },
    { label: "Weekly Report", path: "/admin/reports/weekly" },
  ];

  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    group: "",
    scope: "",
    phase: "",
    week: "",
  });

  const [students] = useState([
    {
      name: "Rahel Adane",
      email: "rahelina24@gmail.com",
      id: "24516",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "GS-1",
      week: "week 1: introduction",
      completion: {
        video: 90,
        checklist: 80,
        liveClass: 100,
        group: 70,
      },
    },
    {
      name: "Abubakr Muhammad",
      email: "bukar1601@gmail.com",
      id: "26604",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "GS-1",
      week: "week 1: introduction",
      completion: {
        video: 100,
        checklist: 90,
        liveClass: 100,
        group: 90,
      },
    },
  ]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const filteredStudents = students.filter(
    (s) =>
      s.course === formData.course &&
      s.batch === formData.batch &&
      s.group === formData.group &&
      s.phase === formData.phase &&
      s.week === formData.week
  );

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <BarChart3 className="text-green-500" />
        Completion Percentage
      </h1>
      {/* Top Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-2 gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={clsx(
                "px-4 py-2 rounded-t text-sm font-medium",
                pathname === tab.path
                  ? "bg-white text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-black"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm mb-6">
        <Select onValueChange={(v) => handleChange("course", v)}>
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fullstack">Fullstack Web Application</SelectItem>
            <SelectItem value="mulesoft">MuleSoft</SelectItem>
            <SelectItem value="aws">AWS</SelectItem>
            <SelectItem value="database">Database</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleChange("batch", v)}>
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="april-2025">April-2025</SelectItem>
            <SelectItem value="may-2025">May-2025</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleChange("group", v)}>
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GS-1">GS-1</SelectItem>
            <SelectItem value="GS-2">GS-2</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleChange("scope", v)}>
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Select Scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="per phase">Per Phase</SelectItem>
            <SelectItem value="per week">Per Week</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleChange("phase", v)}>
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Select Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phase 1">Phase 1</SelectItem>
            <SelectItem value="phase 2">Phase 2</SelectItem>
            <SelectItem value="phase 3">Phase 3</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleChange("week", v)}>
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Select Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week 1: introduction">
              Week 1: Introduction
            </SelectItem>
            <SelectItem value="week 2: CSS">Week 2: CSS</SelectItem>
            <SelectItem value="week 3: HTML">Week 3: HTML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <strong>Total Students: {filteredStudents.length}</strong>
      </div>

      <Card className="overflow-x-auto border border-gray-200 p-4 bg-white">
        <table className="min-w-full text-sm text-black">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="p-2">User Profile</th>
              <th className="p-2">Watched Video</th>
              <th className="p-2">Checklist</th>
              <th className="p-2">Live Class Attendance</th>
              <th className="p-2">Group Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="p-2 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-black rounded-full text-sm font-semibold">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.email}</div>
                    <div className="text-xs text-gray-400">{student.id}</div>
                  </div>
                </td>
                <td className="p-2">{student.completion.video}%</td>
                <td className="p-2">{student.completion.checklist}%</td>
                <td className="p-2">{student.completion.liveClass}%</td>
                <td className="p-2">{student.completion.group}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mt-4 flex gap-4 justify-center items-center text-black">
        <ChevronLeft className="cursor-pointer text-black-600" />
        <div className="text-sm text-gray-500">Page 1 of 5</div>
        <ChevronRight className="cursor-pointer text-black-600" />
      </div>
    </div>
  );
}
