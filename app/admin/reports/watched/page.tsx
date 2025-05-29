"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function CreateWatchedPage() {
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
    phase: "",
    group: "",
    topic: "",
  });

  const [students, setStudents] = useState([
    {
      name: "Rahel Adane",
      email: "rahelina24@gmail.com",
      id: "24516",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "LS-1",
    },
    {
      name: "Abubakr Muhammad",
      email: "bukar1601@gmail.com",
      id: "26604",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "LS-1",
    },
  ]);

  const [checklistItems, setChecklistItems] = useState([
    { topic: "Introduction", status: "read" },
    { topic: "HTML", status: "done" },
    { topic: "CSS", status: "read" },
  ]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (formData.course && formData.batch && formData.phase && formData.group) {
      alert("Checklist Created!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.course === formData.course &&
      student.batch === formData.batch &&
      student.phase === formData.phase &&
      student.group === formData.group
  );

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <BarChart3 className="text-green-600" />
        Watched Class Video
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
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 text-sm">
        {[
          {
            name: "course",
            options: [
              { label: "Fullstack Web Application", value: "fullstack" },
              { label: "MuleSoft", value: "mulesoft" },
              { label: "AWS", value: "aws" },
              { label: "Database", value: "database" },
            ],
          },
          {
            name: "batch",
            options: [
              { label: "April-2025", value: "april-2025" },
              { label: "May-2025", value: "may-2025" },
            ],
          },
          {
            name: "phase",
            options: [
              { label: "Phase 1", value: "phase 1" },
              { label: "Phase 2", value: "phase 2" },
              { label: "Phase 3", value: "phase 3" },
            ],
          },
          {
            name: "group",
            options: [
              { label: "GS-1", value: "LS-1" },
              { label: "GS-2", value: "LS-2" },
            ],
          },
          {
            name: "topic",
            options: [
              { label: "Introduction", value: "Introduction" },
              { label: "HTML", value: "HTML" },
              { label: "CSS", value: "CSS" },
            ],
          },
        ].map((field) => (
          <Select
            key={field.name}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            <SelectTrigger className="w-full bg-gray-100 text-black border-gray-300">
              <SelectValue placeholder={`Select ${field.name}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Total Students */}
      <div className="mb-4 font-semibold">
        Total Students: {filteredStudents.length}
      </div>

      {/* Table */}
      <Card className="overflow-x-auto p-4 border border-gray-300">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-700">
              <th className="p-2">User Profile</th>
              <th className="p-2">Watched Video</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={idx} className="border-b border-gray-200">
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
                <td className="p-2">
                  <div className="flex gap-2 flex-wrap">
                    {checklistItems.map((item, i) => (
                      <Button
                        key={i}
                        size="icon"
                        variant="ghost"
                        className={`rounded-full p-1.5 ${
                          item.status === "done"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                        onClick={() => {
                          const newItems = [...checklistItems];
                          newItems[i].status =
                            newItems[i].status === "done" ? "read" : "done";
                          setChecklistItems(newItems);
                        }}
                      >
                        {item.status === "done" ? (
                          <CheckCircle size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" className="gap-1">
          <ChevronLeft size={16} /> Previous
        </Button>
        <Button variant="outline" className="gap-1">
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
