import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Fullstack Development",
      description:
        "Comprehensive training in modern full-stack web development technologies and frameworks.",
      image: "/fullstack.png",
    },
    {
      id: 2,
      title: "AWS Cloud Computing",
      description:
        "Learn cloud architecture, deployment and AWS services for modern applications.",
      image: "/aws.png",
    },
    {
      id: 3,
      title: "Mulesoft Integration",
      description:
        "Master API-led connectivity and enterprise integration using Mulesoft platform",
      image: "/mulesoft.png",
    },
  ];
  return (
    <main>
      <h1 className="text-xl md:text-2xl font-bold text-center my-5 md:my-8 text-primary">
        Our Services
      </h1>
      <p className="text-center text-xl md:text-4xl my-5 md:my-8 font-bold">
        Fostering a playful & engaging learning{" "}
        <br className="hidden md:block" />
        environment{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-lg   transition-all duration-300"
          >
            <CardHeader className="flex items-center gap-3">
              <Image
                src={service.image}
                className=""
                alt={service.title}
                width={50}
                height={50}
              />
              <CardTitle className="text-2xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg lg:text-xl text-muted-foreground">
                {" "}
                {service.description}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/#contact"
                className="text-primary font-bold text-base md:text-xl group-hover:text-white "
              >
                Learn More &gt;
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
