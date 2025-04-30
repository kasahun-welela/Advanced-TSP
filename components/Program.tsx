import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export default function Program() {
  const programs = [
    {
      id: 1,
      title: "UI/UX Design Masterclass",
      description:
        "Dive into the world of user experience and interface design. Learn to create intuitive, beautiful digital products with hands-on projects and real-world examples.",
      image: "/program1.jpg",
      instructor: "Ajara",
      price: "$299",
      enrolled: "200 Enrolled",
      avatar: "/avatar1.png",
      duration: "08 hr 30 min",
    },
    {
      id: 2,
      title: "Salesforce Administration",
      description:
        "Master Salesforce fundamentals, automation, and CRM best practices. Prepare for certification and boost your career in cloud-based business solutions.",
      image: "/program2.jpg",
      instructor: "John Smith",
      price: "$299",
      enrolled: "400 Enrolled",
      avatar: "/avatar2.png",
      duration: "06 hr 10 min",
    },
    {
      id: 3,
      title: "Front End Development",
      description:
        "Learn HTML, CSS, JavaScript, and modern frameworks to build responsive, interactive websites and web applications from scratch.",
      image: "/program3.jpg",
      instructor: "Peter Parker",
      price: "$299",
      enrolled: "300 Enrolled",
      avatar: "/avatar3.png",
      duration: "02 hr 3 min",
    },
  ];
  return (
    <section className="py-16">
      <h1 className="text-xl md:text-2xl font-bold  my-3  text-primary">
        Explore Our Programs
      </h1>
      <p className=" text-xl md:text-4xl my-3  font-bold">
        our most popular programs
      </p>
      <p className="my-3   md:text-xl text-muted-foreground">
        Let's join our famous class, the knowledge provided will definitely be
        useful for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Card
            key={program.id}
            className="hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="relative">
              <div className="absolute top-2 right-10 bg-white text-black px-3 py-1 rounded-full text-sm">
                {program.duration}
              </div>
              <Image
                src={program.image}
                alt="Program Image"
                width={400}
                height={250}
                className="w-full h-[250px] object-cover rounded-t-xl"
              />
              <CardTitle className="text-2xl mt-4">{program.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                {program.description}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={program.avatar}
                  alt="Instructor"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{program.instructor}</span>
                  <p className="text-muted-foreground">{program.enrolled}</p>
                </div>
              </div>
              <div className="text-xl font-bold text-primary">
                {program.price}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="mt-8 hover:bg-primary hover:text-white"
          variant="outline"
        >
          View All Programs
        </Button>
      </div>
    </section>
  );
}
