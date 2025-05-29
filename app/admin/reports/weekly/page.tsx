"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  Trash,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";
import clsx from "clsx";
type IndividualScore = {
  group: string;
  total: number;
  steps: number[];
  weeklyScore: number | null;
};

type GroupScore = {
  group: string;
  course: string;
  batch: string;
  scores: number[];
  average: number | null;
};

const COURSES = ["fullstack", "mulesoft", "aws", "database"];
const BATCHES = ["april-2025", "may-2025"];
const GROUPS = ["GS-1", "GS-2"];
const PHASES = ["phase 1", "phase 2", "phase 3"];
const WEEKS = ["week 1: introduction", "week 2: CSS", "week 3: HTML"];

export default function WeeklyReportPage() {
  const pathname = usePathname();

  const tabs = [
    { label: "Checklist", path: "/admin/reports/checklist" },
    { label: "Watched Sessions", path: "/admin/reports/watched" },
    { label: "Attendance", path: "/admin/reports/attendance" },
    { label: "Completion", path: "/admin/reports/completion" },
    { label: "Weekly Report", path: "/admin/reports/weekly" },
  ];
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    group: "",
    phase: "",
    week: "",
  });

  const [individualScores, setIndividualScores] = useState<IndividualScore[]>(
    []
  );
  const [groupScores, setGroupScores] = useState<GroupScore[]>([]);

  const handleChange = (name: string, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  useEffect(() => {
    const { course, batch, group, phase, week } = formData;
    if (course && batch && group && phase && week) {
      const newScore: IndividualScore = {
        group,
        total: 14,
        steps: [0, 0, 0, 0, 0],
        weeklyScore: null,
      };
      setIndividualScores([newScore]);

      const exists = groupScores.find((g) => g.group === group);
      if (!exists) {
        const newGroupScore: GroupScore = {
          group,
          course,
          batch,
          scores: [0, 0, 0, 0, 0],
          average: null,
        };
        setGroupScores((prev) => [...prev, newGroupScore]);
      }
    } else {
      setIndividualScores([]);
    }
  }, [formData, groupScores]);

  const calculateColumn = (stepIndex: number) => {
    const updatedIndividuals = individualScores.map((student) => {
      student.steps[stepIndex] = Math.floor(Math.random() * 100);
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const deleteColumn = (stepIndex: number) => {
    const updatedIndividuals = individualScores.map((student) => {
      student.steps[stepIndex] = 0;
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const calculateWeeklyScore = () => {
    const updatedIndividuals = individualScores.map((student) => {
      const totalScore = student.steps.reduce((a, b) => a + b, 0) / 5;
      student.weeklyScore = Math.round(totalScore);
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const deleteWeeklyScore = () => {
    const updatedIndividuals = individualScores.map((student) => {
      student.weeklyScore = null;
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const updateGroupScoresFromIndividuals = (individuals: IndividualScore[]) => {
    const newGroupScores: GroupScore[] = [];

    const groupMap: Record<string, IndividualScore[]> = {};
    individuals.forEach((s) => {
      if (!groupMap[s.group]) groupMap[s.group] = [];
      groupMap[s.group].push(s);
    });

    for (const groupName in groupMap) {
      const members = groupMap[groupName];
      const stepsSum = [0, 0, 0, 0, 0];
      const memberCount = members.length;

      members.forEach((s) => {
        s.steps.forEach((score, i) => {
          stepsSum[i] += score;
        });
      });

      const stepAverages = stepsSum.map((total) =>
        memberCount > 0 ? Math.round(total / memberCount) : 0
      );

      const avgWeeklyScore =
        members.reduce((acc, curr) => acc + (curr.weeklyScore ?? 0), 0) /
        memberCount;

      const formGroup = formData.group === groupName;

      newGroupScores.push({
        group: groupName,
        course: formGroup ? formData.course : "",
        batch: formGroup ? formData.batch : "",
        scores: stepAverages,
        average: Math.round(avgWeeklyScore),
      });
    }

    setGroupScores(newGroupScores);
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
        <BarChart3 className="text-green-500" />
        Weekly Report
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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm mb-6">
        {[
          { name: "course", values: COURSES },
          { name: "batch", values: BATCHES },
          { name: "group", values: GROUPS },
          { name: "phase", values: PHASES },
          { name: "week", values: WEEKS },
        ].map(({ name, values }) => (
          <Select key={name} onValueChange={(val) => handleChange(name, val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${name}`} />
            </SelectTrigger>
            <SelectContent>
              {values.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Group Table */}
      <h2 className="text-lg font-semibold mt-6 mb-2">All Group Scores</h2>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Videos (25%)</TableHead>
            <TableHead>Class (15%)</TableHead>
            <TableHead>Checklist (10%)</TableHead>
            <TableHead>Exercises (25%)</TableHead>
            <TableHead>Group (25%)</TableHead>
            <TableHead>Weekly Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupScores.map((group, idx) => (
            <TableRow key={idx}>
              <TableCell>{group.group}</TableCell>
              {group.scores.map((score, i) => (
                <TableCell key={i}>{score}%</TableCell>
              ))}
              <TableCell>
                {group.average !== null ? `${group.average}%` : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Individual Table */}
      <h2 className="text-lg font-semibold mb-2">Individual Scores</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Total Student</TableHead>
            {["Videos", "Class", "Checklist", "Exercises", "Group"].map(
              (label, i) => (
                <TableHead key={i}>
                  {label} (%)
                  <div className="flex gap-1 mt-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-green-600"
                      onClick={() => calculateColumn(i)}
                    >
                      <Calculator size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => deleteColumn(i)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableHead>
              )
            )}
            <TableHead>
              Weekly Score
              <div className="flex gap-1 mt-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-green-600"
                  onClick={calculateWeeklyScore}
                >
                  <Calculator size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600"
                  onClick={deleteWeeklyScore}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {individualScores.map((student, idx) => (
            <TableRow key={idx}>
              <TableCell>{student.group}</TableCell>
              <TableCell>{student.total}</TableCell>
              {student.steps.map((step, i) => (
                <TableCell key={i}>{step}%</TableCell>
              ))}
              <TableCell>
                {student.weeklyScore !== null ? `${student.weeklyScore}%` : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex gap-4 justify-center items-center">
        <ChevronLeft className="cursor-pointer text-black-500" />
        <div className="text-sm text-gray-500">Page 1 of 5</div>
        <ChevronRight className="cursor-pointer text-black-500" />
      </div>
    </div>
  );
}
