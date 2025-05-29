"use client";

import { useState } from "react";
import { BookOpenCheck, Phone, Landmark, LocateIcon, Flag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserProfile() {
  const [user] = useState({
    name: "Shimelis Techane",
    email: "shimetechane@gmail.com",
    id: "32382",
    phone: "+251910750228",
    city: "N/A",
    state: "1000",
    zip: "1000",
    country: "Ethiopia",
  });

  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(
    null
  );
  const [accessPhases, setAccessPhases] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [certificate, setCertificate] = useState({
    issue: false,
    revoke: false,
  });

  const courses = [
    {
      title: "Fullstack Web Application Development",
      duration: "6 Months",
      type: "Paid",
      logo: "/fullstack.png",
    },
    {
      title: "MuleSoft Development",
      duration: "3 Months",
      type: "Free",
      logo: "/mulesoft.png",
    },
  ];

  const groups = [
    { date: "Dec 5th - 2024", name: "Group 1", confirmed: true },
    { date: "Feb 22nd - 2021", name: "", confirmed: false },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* === User Info Header === */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Discover user profile and enrolled courses overview.
        </p>
      </div>

      {/* === Profile Section === */}
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-5">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/user.jpg" alt="User" />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              ST
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <span className="text-xs text-gray-500">ID: {user.id}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-1 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-green-500" />
            <span className="font-medium">Phone:</span> {user.phone}
          </div>
          <div className="flex items-center gap-2">
            <Landmark size={16} className="text-green-500" />
            <span className="font-medium">City/State:</span> {user.city},{" "}
            {user.state}
          </div>
          <div className="flex items-center gap-2">
            <LocateIcon size={16} className="text-green-500" />
            <span className="font-medium">Zip:</span> {user.zip}
          </div>
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-green-500" />
            <span className="font-medium">Country:</span> {user.country}
          </div>
        </div>
      </div>

      {/* === Enrolled Courses Section === */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Enrolled Courses
        </h3>
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-5 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {/* <img src={course.logo} alt={course.title} className="h-12 w-18 rounded" /> */}
                  <div>
                    <h4 className="font-semibold text-md text-gray-900">
                      {course.title}
                    </h4>
                    <div className="text-xs text-gray-600 mt-1 space-x-2">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {course.duration}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        {course.type}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    setSelectedCourseIndex(
                      selectedCourseIndex === index ? null : index
                    )
                  }
                  className={
                    selectedCourseIndex === index
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : ""
                  }
                  variant={
                    selectedCourseIndex === index ? "default" : "outline"
                  }
                >
                  {selectedCourseIndex === index ? "Selected" : "View Details"}
                </Button>
              </div>

              {selectedCourseIndex === index && (
                <div className="space-y-6 mt-2">
                  {/* === Batch & Group === */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Batch & Group Joined
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groups.map((group, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-lg border ${
                            group.confirmed ? "bg-white" : "bg-gray-100"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <BookOpenCheck className="text-green-500 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {group.date} Batch
                              </p>
                              {group.name && (
                                <p className="text-xs text-muted-foreground">
                                  {group.name}
                                </p>
                              )}
                              {!group.confirmed && (
                                <span className="text-xs text-muted-foreground">
                                  Unconfirmed Group
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* === Access to Phases & Certificate === */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Access To Phase
                      </h4>
                      {accessPhases.map((phase, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1 text-sm"
                        >
                          <span>Phase {idx + 1} :</span>
                          <Switch
                            checked={phase}
                            onCheckedChange={(checked) => {
                              const updated = [...accessPhases];
                              updated[idx] = checked;
                              setAccessPhases(updated);
                            }}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Certificate
                      </h4>
                      <div className="flex items-center justify-between py-1 text-sm">
                        <span>Issue Certificate</span>
                        <Switch
                          checked={certificate.issue}
                          onCheckedChange={(checked) =>
                            setCertificate((prev) => ({
                              ...prev,
                              issue: checked,
                            }))
                          }
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <div className="flex items-center justify-between py-1 text-sm">
                        <span>Revoke Certificate</span>
                        <Switch
                          checked={certificate.revoke}
                          onCheckedChange={(checked) =>
                            setCertificate((prev) => ({
                              ...prev,
                              revoke: checked,
                            }))
                          }
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* === Change Group & Batch === */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Change Group & Batch
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs mb-1 text-gray-600">
                          Associated Batch
                        </label>
                        <Select defaultValue="Mar-2025">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mar-2025">Mar-2025</SelectItem>
                            <SelectItem value="Feb-2024">Feb-2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs mb-1 text-gray-600">
                          Change Group
                        </label>
                        <Select defaultValue="Group 1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Group 1">Group 1</SelectItem>
                            <SelectItem value="Group 2">Group 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Change Group
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
