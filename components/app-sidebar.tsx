"use client";

import { useState, useEffect, ComponentProps } from "react";
import {
  Bot,
  SquareTerminal,
  BookOpen,
  Layers,
  Users,
  Database,
  User,
  Shield,
  Activity,
  BarChart3,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { isUserAdmin } from "@/app/actions/auth";
import { NavAdmin } from "./nav-admin";

// This is side navigation data.
const data = {
  navMain: [
    {
      title: "Courses",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "My Course",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Certification",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "My Certificate",
          url: "#",
        },
      ],
    },
  ],
  navAdmin: [
    {
      title: "Course Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All Course",
          url: "/admin/courses/allCourse",
        },
        {
          title: "Create Course",
          url: "/admin/courses/createCourse",
        },
        {
          title: "Create Phase",
          url: "/admin/courses/createPhase",
        },
        {
          title: "Create Week",
          url: "/admin/courses/createWeek",
        },
        {
          title: "Create Week Component",
          url: "/admin/courses/createWeekComponent",
        },
      ],
    },
    {
      title: "Class Management",
      url: "#",
      icon: Layers,
      items: [
        {
          title: "Create Class",
          url: "/admin/classes/createClass",
        },
        {
          title: "Add Video",
          url: "/admin/classes/addVideo",
        },
        {
          title: "Create Checklist",
          url: "/admin/classes/createChecklist",
        },
        {
          title: "Create Class Component",
          url: "/admin/classes/createClassComponent",
        },
      ],
    },
    {
      title: "Batch and Group ",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Create Batch",
          url: "/admin/batch/createBatch",
        },
        {
          title: "Create Group",
          url: "/admin/batch/createGroup",
        },
        {
          title: "Batch Instructors",
          url: "/admin/batch/batchInstructors",
        },
        {
          title: "Course Instructors",
          url: "/admin/batch/courseInstructors",
        },
      ],
    },
    {
      title: "Content Management",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Add Week Content",
          url: "/admin/content/addWeek",
        },
        {
          title: "Add Class Content",
          url: "/admin/content/addClass",
        },
      ],
    },
    {
      title: "Assignment Management",
      url: "#",
      icon: User,
      items: [
        {
          title: "Assign Week",
          url: "/admin/assignments/assignWeek",
        },
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
      url: "#",
      icon: Shield,
      items: [
        {
          title: "List of Users",
          url: "/admin/users/list",
        },
        {
          title: "List of Students",
          url: "/admin/users/students",
        },
        {
          title: "Group Confirmation",
          url: "/admin/users/groupConfirmation",
        },
      ],
    },
    {
      title: "Session Management",
      url: "#",
      icon: Activity,
      items: [
        {
          title: "Live Session",
          url: "/admin/sessions/live",
        },
        {
          title: "Group Session",
          url: "/admin/sessions/group",
        },
      ],
    },
    {
      title: "Report Management",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Checklist",
          url: "/admin/reports/checklist",
        },
        {
          title: "Watched",
          url: "/admin/reports/watched",
        },
        {
          title: "Attendance",
          url: "/admin/reports/attendance",
        },
        {
          title: "Completion",
          url: "/admin/reports/completion",
        },
        {
          title: "Weekly Report",
          url: "/admin/reports/weekly",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isUserAdmin();
      if (adminStatus === null) {
        window.location.reload();
        return;
      }
      setIsAdmin(adminStatus);
      setIsLoading(false);
    };
    checkAdmin();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <div className="flex flex-col gap-4 p-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ) : (
          <>
            <NavMain items={data.navMain} />
            {isAdmin && <NavAdmin items={data.navAdmin} />}
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
