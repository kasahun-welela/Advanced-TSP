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
      title: "AWS Cloud Essentials",
      description:
        "Learn the fundamentals of AWS cloud computing, including services like EC2, S3, and IAM. Prepare for AWS certification and build your cloud career.",
      image: "/program1.jpg",
      instructor: "Ajara",
      price: "$299",
      enrolled: "200 Enrolled",
      avatar: "/avatar1.png",
      duration: "3 months",
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
      duration: "6 months",
    },
    {
      id: 3,
      title: "Full Stack Development",
      description:
        "Master both frontend and backend development with React, Node.js, and MongoDB. Build real-world applications and prepare for job opportunities in tech companies.",
      image: "/program3.jpg",
      instructor: "Peter Parker",
      price: "$299",
      enrolled: "300 Enrolled",
      avatar: "/avatar3.png",
      duration: "6 months",
    },
    {
      id: 4,
      title: "Data Science and AI",
      description:
        "Learn Python, SQL, and machine learning to analyze data, build predictive models, and prepare for AI-driven roles in tech and business.",
      image: "/program2.jpg",
      instructor: "John Smith",
      price: "$299",
      enrolled: "300 Enrolled",
      avatar: "/avatar2.png",
      duration: "5 months",
    },
    {
      id: 5,
      title: "Mulesoft Masterclass",
      description:
        "Master Mulesoft, the leading integration platform for enterprise application integration. Build scalable, secure, and efficient integrations with hands-on projects.",
      image: "/program1.jpg",
      instructor: "John Smith",
      price: "$299",
      enrolled: "300 Enrolled",
      avatar: "/avatar1.png",
      duration: "4 months",
    },
  ];
  return (
    <section className="pb-16" id="courses">
      <h1 className="text-xl md:text-2xl font-bold  my-3  text-primary">
        Explore Our Programs
      </h1>
      <p className=" text-xl md:text-4xl my-3  font-bold capitalize">
        our most popular programs
      </p>
      <p className="my-3   md:text-xl text-muted-foreground">
        {
          "Let's join our famous class, the knowledge provided will definitely be useful for you. "
        }
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Card
            key={program.id}
            className="hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="relative">
              <div className="absolute top-2 right-10 bg-white text-black px-3 py-1 rounded text-sm">
                {program.duration}
              </div>
              <Image
                src={program.image}
                alt={program.title}
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
              <div className="flex items-center gap-3">
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
