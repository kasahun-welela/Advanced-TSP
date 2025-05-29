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
import { Card, CardContent } from "@/components/ui/card";

export default function ClassAndGroupAttendancePage() {
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
      attendance: {
        liveClassStatus: Array(8).fill(false),
        groupStatus: Array(8).fill(false),
      },
    },
    {
      name: "Abubakr Muhammad",
      email: "bukar1601@gmail.com",
      id: "26604",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "LS-1",
      attendance: {
        liveClassStatus: Array(8).fill(true),
        groupStatus: Array(8).fill(true),
      },
    },
  ]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const toggleStatus = (studentIdx: number, type: string, index: number) => {
    const newStudents = [...students];
    const statusArray =
      type === "liveClassStatus"
        ? newStudents[studentIdx].attendance.liveClassStatus
        : newStudents[studentIdx].attendance.groupStatus;
    statusArray[index] = !statusArray[index];
    setStudents(newStudents);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.course === formData.course &&
      student.batch === formData.batch &&
      student.phase === formData.phase &&
      student.group === formData.group
  );

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <BarChart3 className="text-green-500" />
        Class & Group Attendance
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-sm">
        <Select onValueChange={(val) => handleChange("course", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fullstack">Fullstack Web Application</SelectItem>
            <SelectItem value="mulesoft">MuleSoft</SelectItem>
            <SelectItem value="aws">AWS</SelectItem>
            <SelectItem value="database">Database</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => handleChange("batch", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="april-2025">April-2025</SelectItem>
            <SelectItem value="may-2025">May-2025</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => handleChange("phase", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phase 1">Phase 1</SelectItem>
            <SelectItem value="phase 2">Phase 2</SelectItem>
            <SelectItem value="phase 3">Phase 3</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => handleChange("group", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LS-1">GS-1</SelectItem>
            <SelectItem value="LS-2">GS-2</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => handleChange("topic", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Introduction">Introduction</SelectItem>
            <SelectItem value="HTML">HTML</SelectItem>
            <SelectItem value="CSS">CSS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Total Students */}
      <div className="mb-4 text-sm font-semibold">
        Total Students: {filteredStudents.length}
      </div>

      {/* Attendance Table */}
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2">User Profile</th>
                <th className="p-2">Live Class Attendance</th>
                <th className="p-2">Group Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, studentIdx) => (
                <tr key={studentIdx} className="border-b border-gray-200">
                  <td className="p-2 flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-black rounded-full font-bold text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-gray-600">
                        {student.email}
                      </div>
                      <div className="text-xs text-gray-500">{student.id}</div>
                    </div>
                  </td>

                  <td className="p-2">
                    <div className="flex gap-2 flex-wrap items-center">
                      <span className="text-gray-500 text-xs">C1</span>
                      {Array(8)
                        .fill(false)
                        .map((_, index) => (
                          <Button
                            key={`live-C1-${studentIdx}-${index}`}
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              toggleStatus(studentIdx, "liveClassStatus", index)
                            }
                            className={`rounded-full p-1 ${
                              student.attendance.liveClassStatus[index]
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {student.attendance.liveClassStatus[index] ? (
                              <CheckCircle size={16} />
                            ) : (
                              <XCircle size={16} />
                            )}
                          </Button>
                        ))}
                      <span className="text-gray-500 text-xs">C2</span>
                      {Array(8)
                        .fill(false)
                        .map((_, index) => (
                          <Button
                            key={`live-C2-${studentIdx}-${index}`}
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              toggleStatus(studentIdx, "liveClassStatus", index)
                            }
                            className={`rounded-full p-1 ${
                              student.attendance.liveClassStatus[index]
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {student.attendance.liveClassStatus[index] ? (
                              <CheckCircle size={16} />
                            ) : (
                              <XCircle size={16} />
                            )}
                          </Button>
                        ))}
                    </div>
                  </td>

                  <td className="p-2">
                    <div className="flex gap-2 flex-wrap items-center">
                      {Array(8)
                        .fill(false)
                        .map((_, index) => (
                          <Button
                            key={`group-G1-${studentIdx}-${index}`}
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              toggleStatus(studentIdx, "groupStatus", index)
                            }
                            className={`rounded-full p-1 ${
                              student.attendance.groupStatus[index]
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {student.attendance.groupStatus[index] ? (
                              <CheckCircle size={16} />
                            ) : (
                              <XCircle size={16} />
                            )}
                          </Button>
                        ))}
                      {Array(8)
                        .fill(false)
                        .map((_, index) => (
                          <Button
                            key={`group-G2-${studentIdx}-${index}`}
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              toggleStatus(studentIdx, "groupStatus", index)
                            }
                            className={`rounded-full p-1 ${
                              student.attendance.groupStatus[index]
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {student.attendance.groupStatus[index] ? (
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
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-1 text-black border-gray-400"
        >
          <ChevronLeft size={16} /> Previous
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-1 text-black border-gray-400"
        >
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
