import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export default function Staff() {
  const staff = [
    {
      name: "Theresa Webb",
      image: "/staff1.png",
      title: "Application Support Analyst Lead",
      description:
        "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    },
    {
      name: "Courtney Henry",
      image: "/staff2.png",
      title: "Director, Undergraduate Analytics and Planning",
      description: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    },
    {
      name: "Albert Flores",
      image: "/staff3.png",
      title: "Career Educator",
      description: "Former PM for Linear, Lambda School, and On Deck.",
    },
    {
      name: "Marvin McKinney",
      image: "/staff4.png",
      title: "Co-op & Internships Program & Operations Manager",
      description: "Former frontend dev for Linear, Coinbase, and Postscript.",
    },
  ];
  return (
    <section className="py-16">
      <h1 className="text-center text-xl md:text-2xl font-bold  my-3  text-primary">
        Tutors
      </h1>
      <p className="text-center text-xl md:text-4xl my-3  font-bold capitalize">
        Meet the Heroes
      </p>
      <p className="text-center my-3   md:text-xl text-muted-foreground">
        On Weekend UX, instructors from all over the world instruct millions of
        students. <br />
        We offer the knowledge and abilities.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {staff.map((staff, key) => (
          <Card
            className="hover:shadow-lg transition-all duration-300 shadow-none border-none rounded-none bg-[#ebf3ff] flex flex-col h-full"
            key={key}
          >
            <CardHeader className="flex flex-col items-center text-center">
              <Image
                src={staff.image}
                alt="Staff Member"
                width={120}
                height={120}
                className="rounded-full"
              />
              <CardTitle className="mt-4 text-2xl">{staff.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center ">
              <p className="text-lg md:text-2xl font-light text-primary">
                {staff.title}
              </p>
              <p className="mt-3 text-lg md:text-2xl text-muted-foreground">
                {staff.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 mt-auto">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
