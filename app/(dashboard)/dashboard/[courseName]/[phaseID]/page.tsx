"use client";
import DashboardHeader from "@/components/DashboardHeader";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WeekComponent from "@/components/WeekComponent";
import VideoComponent from "@/components/VideoComponent";
import WeekCheckList from "@/components/WeekCheckList";
function page() {
  const { phaseID } = useParams();
  const weeks = [
    {
      week: 1,
      title: "Introduction to Html",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      week: 2,
      title: "Introduction to CSS",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      week: 3,
      title: "Introduction to JavaScript",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      week: 4,
      title: "Review Session",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];
  return (
    <>
      <DashboardHeader
        previousPage="Dashboard"
        currentPage="Full Stack Web Development"
      />
      <div className="md:w-[80%] w-[90%] mx-auto md:ml-12">
        <h1 className="text-2xl font-bold">Full Stack Web Development</h1>
        <div className="w-full">
          <Card className="my-4 w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Phase 1: HTML, CSS, and JavaScript
              </CardTitle>
              <CardDescription className="md:text-lg">
                Master the fundamentals of web development with HTML5 for
                structure, CSS3 for styling and responsive design, and
                JavaScript for interactivity. Build responsive layouts, create
                animations, and implement basic user interactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-8">
              <Accordion
                type="single"
                collapsible
                className="w-full shadow-sm px-2"
              >
                {weeks.map((week) => (
                  <AccordionItem key={week.week} value={`item-${week.week}`}>
                    <AccordionTrigger className="text-lg md:text-xl hover:text-primary transition-all duration-300">
                      Week {week.week}: {week.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                      <WeekComponent />
                      <VideoComponent />
                      <WeekCheckList />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default page;
