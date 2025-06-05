"use client";

import QuickLinkCard from "@/components/QuickLInkCard";
import {
  BookOpen,
  Layers,
  Users,
  Database,
  User,
  Shield,
  Activity,
  BarChart3,
} from "lucide-react";

export default function AdminPage() {
  const quickLinks = [
    {
      title: "Course Management",
      icon: BookOpen,
      links: [
        { title: "All Course", url: "/admin/courses/allCourse" },
        { title: "Create Course", url: "/admin/courses/createCourse" },
        { title: "Create Phase", url: "/admin/courses/createPhase" },
        { title: "Create Week", url: "/admin/courses/createWeek" },
        {
          title: "Create Week Component",
          url: "/admin/courses/createWeekComponent",
        },
      ],
    },
    {
      title: "Class Management",
      icon: Layers,
      links: [
        { title: "Create Class", url: "/admin/classes/createClass" },
        { title: "Add Video", url: "/admin/classes/addVideo" },
        { title: "Create Checklist", url: "/admin/classes/createChecklist" },
        {
          title: "Create Class Component",
          url: "/admin/classes/createClassComponent",
        },
      ],
    },
    {
      title: "Batch & Group Management",
      icon: Users,
      links: [
        { title: "Create Batch", url: "/admin/batch/createBatch" },
        { title: "Create Group", url: "/admin/batch/createGroup" },
        { title: "Batch Instructors", url: "/admin/batch/batchInstructors" },
        { title: "Course Instructors", url: "/admin/batch/courseInstructors" },
      ],
    },
    {
      title: "Content Management",
      icon: Database,
      links: [
        { title: "Add Week Content", url: "/admin/content/addWeek" },
        { title: "Add Class Content", url: "/admin/content/addClass" },
      ],
    },
    {
      title: "Assignment Management",
      icon: User,
      links: [
        { title: "Assign Week", url: "/admin/assignments/assignWeek" },
        {
          title: "Batch Instructors",
          url: "/admin/assignments/batchInstructors",
        },
        {
          title: "Course Instructors",
          url: "/admin/assignments/courseInstructors",
        },
      ],
    },
    {
      title: "User Management",
      icon: Shield,
      links: [
        { title: "List of Users", url: "/admin/users/list" },
        { title: "List of Students", url: "/admin/users/students" },
        { title: "Group Confirmation", url: "/admin/users/groupConfirmation" },
      ],
    },
    {
      title: "Session Management",
      icon: Activity,
      links: [
        { title: "Live Session", url: "/admin/sessions/live" },
        { title: "Group Session", url: "/admin/sessions/group" },
      ],
    },
    {
      title: "Report Management",
      icon: BarChart3,
      links: [
        { title: "Checklist", url: "/admin/reports/checklist" },
        { title: "Watched", url: "/admin/reports/watched" },
        { title: "Attendance", url: "/admin/reports/attendance" },
        { title: "Completion", url: "/admin/reports/completion" },
        { title: "Weekly Report", url: "/admin/reports/weekly" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {quickLinks.map((section, index) => (
        <QuickLinkCard
          key={index}
          title={section.title}
          icon={section.icon}
          links={section.links}
        />
      ))}
    </div>
  );
}
