"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function GroupConfirmationPage() {
  const pathname = usePathname();
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    accessType: "",
    group: "",
  });

  const tabs = [
    { label: "List Users", path: "/dashboard/users/list" },
    { label: "Students", path: "/dashboard/users/students" },
    { label: "Group Confirmation", path: "/dashboard/users/groupConfirmation" },
  ];

  const handleFilterChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <Users className="text-green-500" />
        Group Confirmation
      </h1>
      {/* Top Tabs + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-2 gap-4 mb-6">
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
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-sm">
        <select
          name="course"
          value={filters.course}
          onChange={handleFilterChange}
          className="p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Course</option>
          <option value="Fullstack Web Application">
            Fullstack Web Application
          </option>
          <option value="MuleSoft">MuleSoft</option>
          <option value="AWS">AWS</option>
          <option value="Database">Database</option>
        </select>

        <select
          name="batch"
          value={filters.batch}
          onChange={handleFilterChange}
          className="p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Batch</option>
          <option value="April-2025">April-2025</option>
          <option value="May-2025">May-2025</option>
        </select>

        <select
          name="accessType"
          value={filters.accessType}
          onChange={handleFilterChange}
          className="p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Access Type</option>
          <option value="Full Access">Full Access</option>
          <option value="Access Only">Access Only</option>
        </select>

        <select
          name="group"
          value={filters.group}
          onChange={handleFilterChange}
          className="p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Group</option>
          <option value="Group 1">Group 1</option>
          <option value="Group 2">Group 2</option>
          <option value="Group 3">Group 3</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded shadow border border-gray-200 text-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b border-gray-300">
              <th className="p-2">User</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Requested Group</th>
              <th className="p-2">Confirm</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2">
                <Image
                  src="/avatar.png"
                  className="w-8 h-8 rounded-full"
                  alt="avatar"
                />
                <div>
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="text-xs text-gray-500">john@example.com</div>
                </div>
              </td>
              <td className="p-2">+251912345678</td>
              <td className="p-2">Group 1</td>
              <td className="p-2">
                <button className="bg-green-600 hover:bg-green-700 px-3 py-1 text-white rounded text-xs">
                  Confirm
                </button>
                <button className="ml-2 bg-yellow-600 hover:bg-yellow-700 px-3 py-1 text-white rounded text-xs">
                  Unconfirm
                </button>
              </td>
              <td className="p-2">
                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded text-xs">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 mt-6">
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
