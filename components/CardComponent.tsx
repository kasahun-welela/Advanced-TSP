import Link from "next/link";
interface CardComponentProps {
  title: string;
  description: string;
  link: string;
}
export default function CardComponent({
  title,
  description,
  link,
}: CardComponentProps) {
  return (
    <div className="flex  gap-4 bg-card p-4 rounded-lg border shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex justify-center items-center">
        <i className="ri-question-mark text-4xl text-primary p-4 rounded-full bg-primary/10"></i>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">{title} </h1>
        <p>{description}</p>

        <Link
          href={link}
          className="bg-primary text-white px-4 py-2 rounded-md w-fit"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
