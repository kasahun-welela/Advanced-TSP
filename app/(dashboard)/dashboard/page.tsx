import CardComponent from "@/components/CardComponent";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mule from "@/public/mule.png";
import fullStack from "@/public/coding.png";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
export default function DashboardPage() {
  const currentProgram = [
    {
      title: "Full Stack Web Development",
      classDate: "10th May 2025",
      duration: "6 months",
      link: "dashboard/full-stack-web-development",
      img: fullStack,
    },
    {
      title: "MuleSoft",
      classDate: "10th May 2025",
      duration: "3 months",
      link: "dashboard/mule-soft",
      img: mule,
    },
  ];
  return (
    <>
      <DashboardHeader previousPage="Dashboard" currentPage="Programs" />
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:ml-12">
        <h1 className="text-2xl font-bold">Current Programs</h1>
        {currentProgram.map((program) => (
          <Card
            className="my-4 hover:shadow-lg transition-all duration-300"
            key={program.title}
          >
            <div className="flex items-start gap-2 md:gap-4 px-3 ">
              <div className="flex items-center justify-center   ">
                <Image
                  src={program.img}
                  alt="Course Logo"
                  width={50}
                  height={50}
                  className=""
                />
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{program.title}</h1>

                <p className="text-muted-foreground my-2 ">
                  {program.classDate}
                </p>
                <div className="md:flex gap-3">
                  <Link
                    href={program.link}
                    className="bg-primary text-white px-4 py-2 rounded-md w-fit"
                  >
                    Continue
                  </Link>
                  <p className="bg-gray-100  px-4 py-2 rounded-md w-fit">
                    {program.duration}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <h1 className="text-2xl font-bold">Past Programs</h1>

        <section className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm  my-4 w-full">
          <p className="text-center text-xl md:text-2xl px-2">
            You have no past programs yet
          </p>
        </section>
        <Card className="my-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Need assistance with your course?
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <CardComponent
              title="Support"
              description="Get instant help on administrative issues from LEA, our AI assistant, or contact our support team."
              link="#"
            />
            <CardComponent
              title="Withdraw"
              description="Withdrawing from your program will end it permanently. You will need to reapply"
              link="#"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
