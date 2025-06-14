"use client";

import { useState } from "react";
import { Users2, Search } from "lucide-react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function ListUsersPage() {
  const [role, setRole] = useState("all");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();

  const tabs = [
    { label: "List Users", path: "/dashboard/users/list" },
    { label: "Students", path: "/dashboard/users/students" },
    { label: "Group Confirmation", path: "/dashboard/users/groupConfirmation" },
  ];

  const users = [
    {
      id: 1,
      avatar: "/avatar1.png",
      name: "John Doe",
      role: "admin",
      contact: "+251912345678",
      address: "Addis Ababa",
      joinedDate: "2024-02-15",
    },
    {
      id: 2,
      avatar: "/avatar2.png",
      name: "Jane Smith",
      role: "instructor",
      contact: "+251987654321",
      address: "Bahir Dar",
      joinedDate: "2023-11-30",
    },
  ];

  const filteredUsers = users.filter((user) => {
    return (
      (role === "all" || user.role === role) &&
      (filter === "all" || user.role === "team member") &&
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalUsers = filteredUsers.length;

  return (
    <div className="p-6 bg-white text-black min-h-screen space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
        <Users2 className="text-green-500" />
        List of Users
      </h1>

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

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
        {/* Role Filter */}
        <div className="space-y-1">
          <Label>Select Role</Label>
          <Select value={role} onValueChange={(value) => setRole(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="supper admin">Supper Admin</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="group instructor">Group Instructor</SelectItem>
              <SelectItem value="team member">Team Member</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Users */}
        <div className="space-y-1">
          <Label>Filter Users</Label>
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Total Users */}
      <div className="text-sm text-gray-600">Total Users: {totalUsers}</div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left p-3 border-b border-gray-300">
                Avatar / Name
              </th>
              <th className="text-left p-3 border-b border-gray-300">
                Contact
              </th>
              <th className="text-left p-3 border-b border-gray-300">
                Address
              </th>
              <th className="text-left p-3 border-b border-gray-300">
                Joined Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-3 flex items-center gap-2">
                  <Image
                    src={user.avatar}
                    width={32}
                    height={32}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </td>
                <td className="p-3">{user.contact}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.joinedDate}</td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No users found.
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
