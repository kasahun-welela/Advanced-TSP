import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

function VideoComponent() {
  return (
    <Accordion type="single" collapsible className="px-3 py-2 shadow-sm mx-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="md:text-xl text-lg hover:text-primary transition-all duration-300">
          <span className="flex items-center gap-2">
            <i className="ri-youtube-fill text-red-600  text-2xl"></i>
            Class Video
          </span>
        </AccordionTrigger>
        <AccordionContent className="">
          <h2 className="text-lg font-semibold">Live Session</h2>
          <div className="flex flex-col gap-2 ml-5 md:ml-10">
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-youtube-fill text-red-600 text-2xl"></i>
                Introduction to Html
              </span>
            </Link>
          </div>
          <h2 className="text-lg font-semibold">Recorded Session</h2>
          <div className="flex flex-col gap-2 ml-5 md:ml-10">
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.1
                Introduction to Html
              </span>
            </Link>
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.2
                Introduction to CSS
              </span>
            </Link>
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.3
                Introduction to JavaScript
              </span>
            </Link>
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.4
                Introduction to React
              </span>
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default VideoComponent;
