import Link from "next/link";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Accordion } from "./ui/accordion";
import React from "react";

export default function WeekCheckList() {
  return (
    <Accordion type="single" collapsible className="px-3  shadow-sm mx-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="md:text-xl text-lg hover:text-primary transition-all duration-300">
          <span className="flex items-center gap-2">
            <i className="ri-check-double-line text-primary  text-2xl"></i>
            Week Checklist
          </span>
        </AccordionTrigger>
        <AccordionContent className="ml-5 md:ml-10">
          <div className="flex flex-col gap-2">
            <Link href="#" className="hover:text-primary">
              <span className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-green-600 text-2xl"></i>
                Practice Exercise Introduction to html and CSS
              </span>
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
