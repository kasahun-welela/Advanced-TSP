import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

function VideoComponent() {
  const videos = {
    liveSessions: [
      {
        title: "Live Session: HTML Fundamentals",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        date: "2024-03-20",
        time: "10:00 AM",
        status: "upcoming",
      },
      {
        title: "Live Session: HTML Fundamentals",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        date: "2024-03-20",
        time: "10:00 AM",
        status: "upcoming",
      },
    ],
    recordedSessions: [
      {
        title: "1.1 Introduction to HTML",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "45:30",
      },
      {
        title: "1.2 Introduction to CSS",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "38:15",
      },
      {
        title: "1.3 Introduction to JavaScript",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "52:45",
      },
    ],
  };

  return (
    <Accordion type="single" collapsible className="px-3 shadow-sm mx-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="md:text-xl text-lg hover:text-primary transition-all duration-300">
          <span className="flex items-center gap-2">
            <i className="ri-youtube-fill text-red-600 text-2xl"></i>
            Class Video
          </span>
        </AccordionTrigger>
        <AccordionContent className="">
          <h2 className="text-lg font-semibold">Live Session</h2>
          <div className="flex flex-col gap-2 ml-5 md:ml-10">
            {videos.liveSessions.map((session, index) => (
              <Link
                key={index}
                href={session.video}
                className="hover:text-primary"
              >
                <span className="flex items-center gap-2">
                  <i className="ri-youtube-fill text-red-600 text-2xl"></i>
                  {session.title} ({session.date} at {session.time})
                </span>
              </Link>
            ))}
          </div>
          <h2 className="text-lg font-semibold mt-4">Recorded Session</h2>
          <div className="flex flex-col gap-2 ml-5 md:ml-10">
            {videos.recordedSessions.map((session, index) => (
              <Link
                key={index}
                href={session.video}
                className="hover:text-primary"
              >
                <span className="flex items-center gap-2">
                  <i className="ri-youtube-fill text-red-600 text-2xl"></i>
                  {session.title} ({session.duration})
                </span>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default VideoComponent;
