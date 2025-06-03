"use client";

import { useState, useEffect, useRef } from "react";
import {
  Hexagon,
  Search,
  LogOut,
  BookOpen,
  Layers,
  Users,
  Database,
  Shield,
  Activity,
  BarChart3,
  User,
  Menu,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { NavSubItem } from "@/components/layout/NavSubItem";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor(public width: number, public height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(100, 150, 255, 0.1)`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > this.width) this.x = 0;
        if (this.x < 0) this.x = this.width;
        if (this.y > this.height) this.y = 0;
        if (this.y < 0) this.y = this.height;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);
  // const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch(
  //       "https://e-learning-mern-stack.onrender.com/api/auth/logout",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     if (data.success) {
  //       localStorage.removeItem("token");
  //       router.push("/login");
  //     }
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };
  const renderFooter = () => (
    <footer className="mt-12 border-t border-gray-300 pt-10 pb-12 text-gray-600 text-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-800">
            Advanced Technical Service Provider
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="text-center md:text-right space-y-1">
          <p>
            Developed by{" "}
            <a
              href="https://your-portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Codex Team
            </a>
          </p>
          <p>
            Contact:{" "}
            <a
              href="mailto:advancestsp@gmail.com"
              className="hover:text-blue-600 transition-colors"
            >
              advancestsp@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
  return (
    <div className={` min-h-screen bg-white text-black relative`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-10"
      />
      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-gray-300 mb-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-green-600">
              Advanced Technical Service Provider
            </span>
          </div>
          {/* Controls: Search, Theme, Avatar, Logout */}
          <div className="flex items-center space-x-16">
            {/* Search Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = (
                  e.currentTarget.elements.namedItem(
                    "search"
                  ) as HTMLInputElement
                ).value;
                if (input.trim())
                  router.push(
                    `/admin/search?query=${encodeURIComponent(input.trim())}`
                  );
              }}
              className="hidden md:flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-300"
            >
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="bg-transparent text-sm focus:outline-none text-black placeholder:text-gray-500"
              />
              <button type="submit">
                <Search className="h-4 w-4 text-black" />
              </button>
            </form>
            {/* Theme Toggle */}
            {/* <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-gray-600 hover:text-black"
      title="Toggle Theme"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </Button> */}

            {/* Avatar + Logout */}
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/user.jpg" alt="User" />
                <AvatarFallback className="bg-gray-300 text-blue-500">
                  ST
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={() => {
                  logout();
                }}
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-red-500"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        {/* Layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "w-72" : "w-16"
            } bg-white text-black border border-gray-300 shadow-md p-4 rounded-xl space-y-4`}
          >
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2 border-b border-gray-300 pb-2">
              <div className="flex items-center space-x-2">
                <Home className="w-4 h-4 text-blue-500" />
                {isSidebarOpen && (
                  <Link href="/admin" className="no-underline text-inherit">
                    admin
                  </Link>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="w-5 h-5 text-gray-700" />
              </Button>
            </div>
            {isSidebarOpen && (
              <>
                <NavDropdown icon={BookOpen} label="Course Management">
                  <NavSubItem
                    label="All Course"
                    href="/admin/courses/allCourse"
                  />
                  <NavSubItem
                    label="Create Course"
                    href="/admin/courses/createCourse"
                  />
                  <NavSubItem
                    label="Create Phase"
                    href="/admin/courses/createPhase"
                  />
                  <NavSubItem
                    label="Create Week"
                    href="/admin/courses/createWeek"
                  />
                  <NavSubItem
                    label="Create Week Component"
                    href="/admin/courses/createWeekComponent"
                  />
                </NavDropdown>

                <NavDropdown icon={Layers} label="Class Management">
                  <NavSubItem
                    label="Create Class"
                    href="/admin/classes/createClass"
                  />
                  <NavSubItem
                    label="Add Video"
                    href="/admin/classes/addVideo"
                  />
                  <NavSubItem
                    label="Create Checklist"
                    href="/admin/classes/createChecklist"
                  />
                  <NavSubItem
                    label="Create Class Component"
                    href="/admin/classes/createClassComponent"
                  />
                </NavDropdown>

                <NavDropdown icon={Users} label="Batch & Group Management">
                  <NavSubItem
                    label="Create Batch"
                    href="/admin/batch/createBatch"
                  />
                  <NavSubItem
                    label="Create Group"
                    href="/admin/batch/createGroup"
                  />
                  <NavSubItem
                    label="Batch Instructors"
                    href="/admin/batch/batchInstructors"
                  />
                  <NavSubItem
                    label="Course Instructors"
                    href="/admin/batch/courseInstructors"
                  />
                </NavDropdown>

                <NavDropdown icon={Database} label="Add Content Management">
                  <NavSubItem
                    label="Add Week Content"
                    href="/admin/content/addWeek"
                  />
                  <NavSubItem
                    label="Add Class Content"
                    href="/admin/content/addClass"
                  />
                </NavDropdown>

                <NavDropdown icon={User} label="Manage Assignments">
                  <NavSubItem
                    label="Assign Week"
                    href="/admin/assignments/assignWeek"
                  />
                  <NavSubItem
                    label="Batch Instructors"
                    href="/admin/assignments/batchInstructors"
                  />
                  <NavSubItem
                    label="Course Instructors"
                    href="/admin/assignments/courseInstructors"
                  />
                </NavDropdown>

                <NavDropdown icon={Shield} label="User Management">
                  <NavSubItem label="List of Users" href="/admin/users/list" />
                  <NavSubItem
                    label="List of Students"
                    href="/admin/users/students"
                  />
                  <NavSubItem
                    label="Group Confirmation"
                    href="/admin/users/groupConfirmation"
                  />
                </NavDropdown>

                <NavDropdown icon={Activity} label="Session Management">
                  <NavSubItem
                    label="Live Session"
                    href="/admin/sessions/live"
                  />
                  <NavSubItem
                    label="Group Session"
                    href="/admin/sessions/group"
                  />
                </NavDropdown>

                <NavDropdown icon={BarChart3} label="Report Management">
                  <NavSubItem
                    label="Checklist"
                    href="/admin/reports/checklist"
                  />
                  <NavSubItem label="Watched" href="/admin/reports/watched" />
                  <NavSubItem
                    label="Attendance"
                    href="/admin/reports/attendance"
                  />
                  <NavSubItem
                    label="Completion"
                    href="/admin/reports/completion"
                  />
                  <NavSubItem
                    label="Weekly Report"
                    href="/admin/reports/weekly"
                  />
                </NavDropdown>
              </>
            )}

            {/* === Bottom User + View Profile Section === */}
            <div className="mt-4">
              <div className="flex items-center justify-center md:justify-between px-3 py-2 rounded-md bg-white-200 hover:bg-gray-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/user.jpg" alt="User" />
                    <AvatarFallback className="bg-white-300 text-blue-500">
                      ST
                    </AvatarFallback>
                  </Avatar>

                  {/* Conditionally show "View Profile" only when sidebar is open */}
                  {isSidebarOpen && (
                    <Link
                      href="/admin/userProfile"
                      className="text-gray-600 hover:text-green-600 text-sm px-2 py-1 font-semibold"
                    >
                      View Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
      {renderFooter()}
    </div>
  );
}
