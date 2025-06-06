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
import { Card } from "@/components/ui/card";
export default function CreateLiveSessionPage() {
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
    session: "",
    zoomLink: "",
  });

  const [sessions, setSessions] = useState([
    {
      createdBy: "Admin",
      sessionTitle: "Week 1 - Intro",
      batch: "April-2025",
      zoomLink: "https://zoom.us/abc",
      status: "Active",
    },
    {
      createdBy: "Admin",
      sessionTitle: "Week 2 - HTML",
      batch: "May-2025",
      zoomLink: "https://zoom.us/def",
      status: "Inactive",
    },
  ]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    const { course, batch, phase, week, session, zoomLink } = formData;
    if (course && batch && phase && week && session && zoomLink) {
      const newSession = {
        createdBy: "Admin",
        sessionTitle: `${week} - ${course}`,
        batch,
        group: session,
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
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <Video className="text-green-500" />
        Create Live Session
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
          onValueChange={(value) => setFormData({ ...formData, course: value })}
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
          onValueChange={(value) => setFormData({ ...formData, batch: value })}
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
          onValueChange={(value) => setFormData({ ...formData, phase: value })}
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
          onValueChange={(value) => setFormData({ ...formData, week: value })}
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
          onValueChange={(value) =>
            setFormData({ ...formData, session: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Live Session" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LS-1">LS-1</SelectItem>
            <SelectItem value="LS-2">LS-2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Zoom Link and Create Button */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <Input
          name="zoomLink"
          value={formData.zoomLink}
          onChange={handleChange}
          placeholder="Zoom Meeting Link"
          className="w-full md:w-2/3"
        />
        <Button
          onClick={handleCreate}
          className="bg-green-500 hover:bg-orange-600 text-white"
        >
          Create
        </Button>
      </div>

      {/* Sessions Table */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Live Session Links</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-black">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Created By</th>
                <th className="px-4 py-2">Session Title</th>
                <th className="px-4 py-2">Batch</th>
                <th className="px-4 py-2">Live Session Link</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{session.createdBy}</td>
                  <td className="px-4 py-2">{session.sessionTitle}</td>
                  <td className="px-4 py-2">{session.batch}</td>
                  <td className="px-4 py-2 relative">
                    <a
                      href={session.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {session.zoomLink}
                    </a>
                    {session.status === "Active" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyLink(session.zoomLink)}
                        className="absolute top-1 right-1 text-orange-500 hover:text-orange-600"
                      >
                        <Copy size={16} />
                      </Button>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      onClick={() => handleStatusChange(index)}
                      className={`cursor-pointer px-2 py-1 text-xs rounded ${
                        session.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="link"
                      className="text-red-500 p-0 h-auto"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="flex items-center gap-1">
            <ChevronLeft size={16} /> Previous
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
