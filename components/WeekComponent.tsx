import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function WeekComponent() {
  return (
    <Accordion type="single" collapsible className="px-3 shadow-sm mx-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="md:text-xl text-lg  hover:text-primary transition-all duration-300">
          <span className="flex items-center gap-2">
            <i className="ri-todo-fill text-primary text-2xl"></i>
            Todo List : Todo list of the Week
          </span>
        </AccordionTrigger>
        <AccordionContent className="ml-5 md:ml-10">
          <div className="flex flex-col gap-2">
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-file-pdf-2-line text-red-600 text-2xl"></i>
                Todo List Introduction to html and CSS
              </span>
            </Link>
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-file-pdf-2-line text-red-600 text-2xl"></i>{" "}
                Practice Exercise Introduction to html and CSS
              </span>
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
