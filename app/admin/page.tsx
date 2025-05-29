"use client";

import { useEffect, useState, useRef, JSX } from "react";
import {
  Activity,
  BarChart3,
  Book,
  BookOpen,
  Database,
  Layers,
  ListChecks,
  User,
  Users,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Theme = "dark" | "light";
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  user_id_number: string;
  last_login: string;
  roles: string[];
};
export default function Dashboard() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isLoading, setIsLoading] = useState(true);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // System metrics state
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 42,
    memoryUsage: 68,
    uptime: "14d 06:42:18",
    timezone: "UTC-08:00",
    storage: 35,
  });

  // Initialize with null to prevent hydration mismatch
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Time initialization and interval
  useEffect(() => {
    // Client-side only
    setCurrentTime(new Date());
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // System metrics interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        ...prev,
        cpuUsage: Math.floor(Math.random() * 30) + 30,
        memoryUsage: Math.floor(Math.random() * 20) + 60,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, 
          ${Math.floor(Math.random() * 100) + 150}, 
          ${Math.floor(Math.random() * 55) + 200}, 
          ${Math.random() * 0.5 + 0.2})`;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary checks
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles = Array.from(
      { length: 100 },
      () => new Particle(canvas.width, canvas.height)
    );

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);

    // Handle resize
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Formatting helpers with null checks
  const formatTime = (date: Date | null) =>
    date?.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }) || "--:--:--";

  const formatDate = (date: Date | null) =>
    date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) || "Loading...";

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 animate-spin-slower">
            <div className="absolute inset-0 border-4 border-green-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border-4 border-t-green-500 border-r-transparent rounded-full animate-spin"></div>
          </div>
          <div className="mt-4 text-green-500 font-mono text-sm tracking-wider">
            SYSTEM INITIALIZING
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${theme} min-h-screen bg-white text-gray-900 relative overflow-hidden`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-10"
      />

      <div className="container mx-auto p-4 relative z-10">
        <div className="flex gap-6">
          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* Quick Links */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-gray-200 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-green-500" />
                      Quick Links
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-white-100 text-green-700 border border-blue-300 text-xs"
                    >
                      Quick Access to Essential Tools and Resources!
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Course Management */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
                <CardHeader className="border-b border-gray-200 pb-3">
                  <CardTitle className="flex items-center text-black">
                    <Book className="mr-2 h-5 w-5 text-green-500" />
                    Course Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ManagementLink
                      icon={BookOpen}
                      label="All Courses"
                      href="/admin/courses/allCourse"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Create Course"
                      href="/admin/courses/createCourse"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Create Phase"
                      href="/admin/courses/createPhase"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Create Week"
                      href="/admin/courses/createWeek"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Create Week Component"
                      href="/admin/courses/createWeekComponent"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Add Week Content"
                      href="/admin/courses/addWeekContent"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Supplementary Course Offerings"
                      href="/admin/courses/supplementary"
                    />
                    <ManagementLink
                      icon={Book}
                      label="Select Supplementary Course"
                      href="/admin/courses/selectSupplementary"
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Class Management & Batch Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2 border-b border-gray-200">
                    <CardTitle className="text-gray-900 flex items-center text-base">
                      <Layers className="mr-2 h-5 w-5 text-green-500" />
                      Class Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink
                        icon={Layers}
                        label="Create Class"
                        href="/admin/classes/createClass"
                      />
                      <ManagementLink
                        icon={Video}
                        label="Add Class Video"
                        href="/admin/classes/addVideo"
                      />
                      <ManagementLink
                        icon={ListChecks}
                        label="Create Checklist"
                        href="/admin/classes/createChecklist"
                      />
                      <ManagementLink
                        icon={Layers}
                        label="Create Class Component"
                        href="/admin/classes/createClassComponent"
                      />
                      <ManagementLink
                        icon={Database}
                        label="Add Class Content"
                        href="/admin/content/addClass"
                      />
                      <ManagementLink
                        icon={Book}
                        label="Assign Week"
                        href="/admin/assignments/assignWeek"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2 border-b border-gray-200">
                    <CardTitle className="text-gray-900 flex items-center text-base">
                      <Users className="mr-2 h-5 w-5 text-green-500" />
                      Batch Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink
                        icon={Users}
                        label="Create Batch"
                        href="/admin/batch/createBatch"
                      />
                      <ManagementLink
                        icon={Users}
                        label="Create Group"
                        href="/admin/batch/createGroup"
                      />
                      <ManagementLink
                        icon={Users}
                        label="Assign Batch Instructors"
                        href="/admin/batch/batchInstructors"
                      />
                      <ManagementLink
                        icon={Users}
                        label="Assign Course Instructors"
                        href="/admin/batch/courseInstructors"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Management & Session Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2 border-b border-gray-200">
                    <CardTitle className="text-gray-900 flex items-center text-base">
                      <User className="mr-2 h-5 w-5 text-green-500" />
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink
                        icon={User}
                        label="List Of Users"
                        href="/admin/users/list"
                      />
                      <ManagementLink
                        icon={User}
                        label="List Of Students"
                        href="/admin/users/students"
                      />
                      <ManagementLink
                        icon={User}
                        label="Confirm Group Request"
                        href="/admin/users/groupConfirmation"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2 border-b border-gray-200">
                    <CardTitle className="text-gray-900 flex items-center text-base">
                      <Activity className="mr-2 h-5 w-5 text-green-500" />
                      Session Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink
                        icon={Activity}
                        label="Create Live Session"
                        href="/admin/sessions/live"
                      />
                      <ManagementLink
                        icon={Activity}
                        label="Create Group Session"
                        href="/admin/sessions/group"
                      />
                      <ManagementLink
                        icon={Video}
                        label="Add Live Class Video"
                        href="/admin/classes/addVideo"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Report Management */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2 border-b border-gray-200">
                  <CardTitle className="text-gray-900 flex items-center text-base">
                    <BarChart3 className="mr-2 h-5 w-5 text-green-500" />
                    Report Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ManagementLink
                      icon={ListChecks}
                      label="Checklist"
                      href="/admin/reports/checklist"
                    />
                    <ManagementLink
                      icon={Video}
                      label="Watched Videos"
                      href="/admin/reports/watched"
                    />
                    <ManagementLink
                      icon={Users}
                      label="Attendance"
                      href="/admin/reports/attendance"
                    />
                    <ManagementLink
                      icon={ListChecks}
                      label="Completion"
                      href="/admin/reports/completion"
                    />
                    <ManagementLink
                      icon={BarChart3}
                      label="Weekly Report"
                      href="/admin/reports/weekly"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="grid gap-6">
              <SystemTimeCard
                time={currentTime}
                uptime={systemMetrics.uptime}
                timezone={systemMetrics.timezone}
              />

              <QuickActionsCard />

              <UserProfileCard />

              <SystemStatusCard
                cpuUsage={systemMetrics.cpuUsage}
                memoryUsage={systemMetrics.memoryUsage}
                storageUsage={systemMetrics.storage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component Sub-sections

function DashboardSection({
  title,
  icon: Icon,
  children,
  badge,
  compact = false,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  badge?: string;
  compact?: boolean;
}) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardHeader
        className={`${compact ? "pb-2" : "pb-3"} border-b border-slate-700/50`}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center">
            <Icon className="mr-2 h-5 w-5 text-green-500" />
            {title}
          </CardTitle>
          {badge && (
            <Badge
              variant="outline"
              className="bg-slate-800/50 text-blue-400 border-blue-500/50 text-xs"
            >
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className={compact ? "p-4" : "p-6"}>{children}</CardContent>
    </Card>
  );
}
function SystemTimeCard({
  time,
  uptime,
  timezone,
}: {
  time: Date | null;
  uptime: string;
  timezone: string;
}) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-6 border-b border-gray-200">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-mono">
              SYSTEM TIME
            </div>
            <div className="text-3xl font-mono text-green-600 mb-1">
              {time?.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }) || "--:--:--"}
            </div>
            <div className="text-sm text-gray-700">
              {time?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) || "Loading..."}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="Uptime" value={uptime} />
            <MetricBox label="Time Zone" value={timezone} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-100 rounded-md p-3 border border-gray-200">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-mono text-black">{value}</div>
    </div>
  );
}

function QuickActionsCard() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm text-black">
      <CardHeader className="pb-2 border-b border-gray-200">
        <CardTitle className="text-base text-black">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <ManagementLink
            icon={ListChecks}
            label="Checklist"
            href="/admin/reports/checklist"
          />
          <ManagementLink
            icon={Video}
            label="Watched Videos"
            href="/admin/reports/watched"
          />
          <ManagementLink
            icon={Users}
            label="Attendance"
            href="/admin/reports/attendance"
          />
          <ManagementLink
            icon={BarChart3}
            label="Weekly Report"
            href="/admin/reports/weekly"
          />
        </div>
      </CardContent>
    </Card>
  );
}

type ActionButtonProps = {
  icon: LucideIcon; // or IconType if using react-icons
  label: string;
};
const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label }) => (
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100">
    <Icon className="h-5 w-5 text-green-500" />
    {label}
  </button>
);
function UserProfileCard(): JSX.Element | null {
  const [user, setUser] = useState<User | null>(null);
  const [localLoginTime, setLocalLoginTime] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      // const token = getToken();
      // if (!token) {
      //   router.push('/login');
      //   return;
      // }

      try {
        const res = await fetch(
          "https://e-learning-mern-stack.onrender.com/api/auth/me"
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        // console.log("Full API response:", data);
        setUser(data.user);

        if (data.user.last_login) {
          const formatted = new Date(data.user.last_login).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );
          setLocalLoginTime(formatted);
        } else {
          console.warn("⚠️ last_login field is missing in user data");
          setLocalLoginTime("Unknown");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      }
    }

    fetchUser();
  }, [router]);

  if (!user) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm text-black">
      <CardHeader className="pb-2 border-b border-gray-200">
        <CardTitle className="text-base text-black">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
            <AvatarFallback className="bg-gray-200 text-green-500 text-xl">
              {user.initials || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-lg font-medium text-black">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
        </div>
        <div className="space-y-3">
          <MetricRow
            label="Role"
            value={
              <Badge className="bg-green-100 text-green-600 border border-green-300 capitalize">
                {user.roles?.[0] || "User"}
              </Badge>
            }
          />
          <MetricRow
            label="Last Login"
            value={localLoginTime || "Not available"}
          />
          <MetricRow
            label="Status"
            value={
              <Badge className="bg-green-100 text-green-600 border border-green-300">
                Active
              </Badge>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-sm text-black">{value}</div>
    </div>
  );
}

function SystemStatusCard({
  cpuUsage,
  memoryUsage,
  storageUsage,
}: {
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
}) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm text-black">
      <CardHeader className="pb-2 border-b border-gray-200">
        <CardTitle className="text-base text-black">System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UsageMetric
            label="Server Load"
            value={`${cpuUsage}% utilized`}
            percentage={cpuUsage}
            gradient="from-green-400 to-amber-400"
          />
          <UsageMetric
            label="Database"
            value={`${memoryUsage}% utilized`}
            percentage={memoryUsage}
            gradient="from-purple-400 to-pink-400"
          />
          <UsageMetric
            label="Storage"
            value={`${storageUsage}% utilized`}
            percentage={storageUsage}
            gradient="from-blue-400 to-indigo-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
function UsageMetric({
  label,
  value,
  percentage,
  gradient,
}: {
  label: string;
  value: string;
  percentage: number;
  gradient: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xs text-gray-700">{value}</div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

type ManagementLinkProps = {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
};

const ManagementLink: React.FC<ManagementLinkProps> = ({
  icon: Icon,
  label,
  href,
  onClick,
}) => {
  const baseClasses =
    "flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition";

  const content = (
    <>
      <Icon className="h-5 w-5 text-green-500 shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};
