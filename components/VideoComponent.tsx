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
        <AccordionTrigger>Class Video</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <Link href="#" className="hover:text-primary">
              <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.1
              Introduction to Html
            </Link>
            <Link href="#" className="hover:text-primary">
              <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.2
              Introduction to CSS
            </Link>
            <Link href="#" className="hover:text-primary">
              <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.3
              Introduction to JavaScript
            </Link>
            <Link href="#" className="hover:text-primary">
              <i className="ri-youtube-fill text-red-600 text-2xl"></i> 1.4
              Introduction to React
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default VideoComponent;
