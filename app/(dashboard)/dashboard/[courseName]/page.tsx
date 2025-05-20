"use client";
import CardComponent from "@/components/CardComponent";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { usePathname } from "next/navigation";

function page() {
  const pathname = usePathname();
  const coursePhase = [
    {
      phase: 1,
      title: "Phase 1: HTML, CSS, and JavaScript",
      description:
        "Master the fundamentals of web development with HTML5 for structure, CSS3 for styling and responsive design, and JavaScript for interactivity. Build responsive layouts, create animations, and implement basic user interactions.",
      link: `${pathname}/phase-1`,
    },
    {
      phase: 2,
      title: "Phase 2: Advanced JavaScript",
      description:
        "Dive deep into modern JavaScript concepts including ES6+, asynchronous programming, DOM manipulation, event handling, and object-oriented programming. Learn to build complex applications with clean, maintainable code.",
      link: `${pathname}/phase-2`,
    },
    {
      phase: 3,
      title: "Phase 3: React Development",
      description:
        "Build modern, interactive web applications using React. Learn component-based architecture, state management with hooks, routing, form handling, and integration with REST APIs. Create reusable components and implement best practices.",
      link: `${pathname}/phase-3`,
    },
    {
      phase: 4,
      title: "Phase 4: Node.js and Express",
      description:
        "Develop robust backend applications using Node.js and Express.js. Learn server-side programming, RESTful API development, middleware implementation, authentication, and database integration. Build scalable and secure applications.",
      link: `${pathname}/phase-4`,
    },
    {
      phase: 5,
      title: "Phase 5: MongoDB and Database Management",
      description:
        "Master MongoDB database management, including schema design, CRUD operations, indexing, and aggregation. Learn to integrate MongoDB with Node.js applications, implement data validation, and optimize database performance.",
      link: `${pathname}/phase-5`,
    },
  ];
  return (
    <>
      <DashboardHeader
        previousPage="Dashboard"
        currentPage="Full Stack Web Development"
      />
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:ml-12">
        <h1 className="text-2xl font-bold">Full Stack Web Development</h1>

        <Card className="my-4 w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Full Stack Web Development Course Phases
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            {coursePhase.map((phase) => (
              <div key={phase.title} className="my-4">
                <CardComponent
                  title={phase.title}
                  description={phase.description}
                  link={phase.link}
                  phase={phase.phase}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default page;
