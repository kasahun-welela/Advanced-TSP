"use client";

import { useState } from "react";
import { GraduationCap, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
const tabs = [
  { label: "List Users", path: "/dashboard/users/list" },
  { label: "Students", path: "/dashboard/users/students" },
  { label: "Group Confirmation", path: "/dashboard/users/groupConfirmation" },
];

export default function ListStudentsPage() {
  const [course, setCourse] = useState("all");
  const [studentType, setStudentType] = useState("all");
  const [batch, setBatch] = useState("all");
  const [accessType, setAccessType] = useState("all");
  const [phase, setPhase] = useState("any");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();

  const students = [
    {
      id: 1,
      avatar: "/avatar1.png",
      name: "Liya Mekonnen",
      contact: "+251911223344",
      course: "fullstack web application",
      type: "scholarship",
      batch: "april-2025",
      access: "full",
      phase: "phase 1",
    },
    {
      id: 2,
      avatar: "/avatar2.png",
      name: "Samuel Desta",
      contact: "+251922334455",
      course: "aws",
      type: "paid",
      batch: "may-2025",
      access: "access only",
      phase: "no phase access",
    },
  ];

  const filteredStudents = students.filter((student) => {
    return (
      (course === "all" || student.course === course) &&
      (studentType === "all" || student.type === studentType) &&
      (batch === "all" || student.batch === batch) &&
      (accessType === "all" || student.access === accessType) &&
      (phase === "any" || student.phase === phase) &&
      student.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalStudents = filteredStudents.length;

  return (
    <div className="p-6 bg-white text-black min-h-screen space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
        <GraduationCap className="text-green-500" />
        List of Students
      </h1>

      {/* Top Tabs */}
      {/* Top Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-2 gap-4">
        {/* Navigation Tabs */}
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

        {/* Search Input (with spacing from top tabs) */}
        <div className="relative w-full md:w-1/3 mt-2 md:mt-0">
          <Input
            type="text"
            placeholder="Search students"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-sm">
        <div className="space-y-1">
          <Label>Select Course</Label>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="fullstack web application">
                Fullstack Web Application
              </SelectItem>
              <SelectItem value="mulesoft">MuleSoft</SelectItem>
              <SelectItem value="aws">AWS</SelectItem>
              <SelectItem value="database">Database</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Student Type</Label>
          <Select value={studentType} onValueChange={setStudentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="scholarship">Scholarship</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Batch</Label>
          <Select value={batch} onValueChange={setBatch}>
            <SelectTrigger>
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="april-2025">April-2025</SelectItem>
              <SelectItem value="may-2025">May-2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Access Type</Label>
          <Select value={accessType} onValueChange={setAccessType}>
            <SelectTrigger>
              <SelectValue placeholder="Access type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="full">Full Access</SelectItem>
              <SelectItem value="access only">Access Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Phase</Label>
          <Select value={phase} onValueChange={setPhase}>
            <SelectTrigger>
              <SelectValue placeholder="Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="no phase access">No Phase Access</SelectItem>
              <SelectItem value="phase 1">Phase 1</SelectItem>
              <SelectItem value="phase 2">Phase 2</SelectItem>
              <SelectItem value="no phase 1 access">
                No Phase 1 Access
              </SelectItem>
              <SelectItem value="no phase 2 access">
                No Phase 2 Access
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Total Students */}
      <div className="text-sm text-gray-600">
        Total Students: {totalStudents}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left p-3 border-b border-gray-300">
                Avatar / Name
              </th>
              <th className="text-left p-3 border-b border-gray-300">
                Contact
              </th>
              <th className="text-left p-3 border-b border-gray-300">Course</th>
              <th className="text-left p-3 border-b border-gray-300">Batch</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-3 flex items-center gap-2">
                  <Image
                    src={student.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{student.name}</span>
                </td>
                <td className="p-3">{student.contact}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.batch}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-600">Page {currentPage}</span>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
