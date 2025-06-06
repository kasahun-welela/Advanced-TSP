"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Video, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function CreateGroupSessionPage() {
  const pathname = usePathname();

  const tabs = [
    { label: "Live Session", path: "/admin/sessions/live" },
    { label: "Group Sessions", path: "/admin/sessions/group" },
  ];
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    phase: "",
    week: "",
    group: "",
    zoomLink: "",
  });

  const [sessions, setSessions] = useState([
    {
      createdBy: "Admin",
      sessionTitle: "Week 1 - Intro",
      batch: "April-2025",
      group: "LS-1",
      zoomLink: "https://zoom.us/abc",
      status: "Active",
    },
    {
      createdBy: "Admin",
      sessionTitle: "Week 2 - HTML",
      batch: "May-2025",
      group: "LS-2",
      zoomLink: "https://zoom.us/def",
      status: "Inactive",
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    const { course, batch, phase, week, group, zoomLink } = formData;
    if (zoomLink && course && batch && phase && week && group) {
      const newSession = {
        createdBy: "Admin",
        sessionTitle: `${week} - ${course}`,
        batch,
        group,
        zoomLink,
        status: "Active",
      };
      setSessions([...sessions, newSession]);
      setFormData({ ...formData, zoomLink: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const handleStatusChange = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions[index].status =
      updatedSessions[index].status === "Active" ? "Inactive" : "Active";
    setSessions(updatedSessions);
  };

  const handleCopyLink = (zoomLink: string) => {
    navigator.clipboard.writeText(zoomLink);
    alert("Zoom link copied to clipboard!");
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
        <Video className="text-green-600" />
        Create Group Session
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
        <Select
          onValueChange={(value) => handleSelectChange("course", value)}
          value={formData.course}
        >
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

        <Select
          onValueChange={(value) => handleSelectChange("batch", value)}
          value={formData.batch}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="april-2025">April-2025</SelectItem>
            <SelectItem value="may-2025">May-2025</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleSelectChange("phase", value)}
          value={formData.phase}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phase 1">Phase 1</SelectItem>
            <SelectItem value="phase 2">Phase 2</SelectItem>
            <SelectItem value="phase 3">Phase 3</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleSelectChange("week", value)}
          value={formData.week}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week 1">Week 1: Introduction</SelectItem>
            <SelectItem value="week 2">Week 2: HTML</SelectItem>
            <SelectItem value="week 3">Week 3: CSS</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleSelectChange("group", value)}
          value={formData.group}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LS-1">GS-1</SelectItem>
            <SelectItem value="LS-2">GS-2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Zoom Link & Create Button */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          name="zoomLink"
          value={formData.zoomLink}
          onChange={handleChange}
          placeholder="Zoom Meeting Link"
          className="w-full md:w-2/3"
        />
        <Button
          className="bg-green-500 hover:bg-orange-600 text-white"
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>

      {/* Group Session Links Table */}
      <div className="bg-gray-100 p-4 rounded border border-gray-300">
        <h2 className="text-lg font-semibold mb-4">Group Session Links</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Created By</th>
                <th className="px-4 py-2">Session Title</th>
                <th className="px-4 py-2">Batch & Group</th>
                <th className="px-4 py-2">Group Session Link</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">{session.createdBy}</td>
                  <td className="px-4 py-2">{session.sessionTitle}</td>
                  <td className="px-4 py-2">
                    {session.batch} & {session.group}
                  </td>
                  <td className="px-4 py-2 text-blue-600 underline relative">
                    <a
                      href={session.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {session.zoomLink}
                    </a>
                    {session.status === "Active" && (
                      <button
                        className="absolute top-1 right-1 p-1 text-white bg-orange-500 rounded-full"
                        onClick={() => handleCopyLink(session.zoomLink)}
                      >
                        <Copy size={14} />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      onClick={() => handleStatusChange(index)}
                      className={`cursor-pointer px-2 py-1 text-xs ${
                        session.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      } text-white rounded`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="text-black border-gray-400">
            <ChevronLeft size={16} className="mr-1" /> Previous
          </Button>
          <Button variant="outline" className="text-black border-gray-400">
            Next <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
