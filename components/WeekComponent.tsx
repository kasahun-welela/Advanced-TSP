import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function WeekComponent() {
  return (
    <Accordion type="single" collapsible className="px-3 py-2 shadow-sm mx-2">
      <AccordionItem value="item-1">
        <AccordionTrigger>Todo List : Todo list of the Week</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <Link href="#" className="hover:text-primary">
              <i className="ri-file-pdf-2-line text-red-600 text-2xl"></i> Todo
              List Introduction to html and CSS
            </Link>
            <Link href="#" className="hover:text-primary">
              <i className="ri-file-pdf-2-line text-red-600 text-2xl"></i>{" "}
              Practice Exercise Introduction to html and CSS
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
