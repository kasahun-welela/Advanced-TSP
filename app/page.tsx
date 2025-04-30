import Services from "@/components/Services";
import Program from "@/components/Program";
import Staff from "@/components/Staff";
export default function Home() {
  return (
    <div className="max-w-[90%] mx-auto">
      <Services />
      <Program />
      <Staff />
    </div>
  );
}
