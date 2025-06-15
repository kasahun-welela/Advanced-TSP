// import Services from "@/components/Services";
import Program from "@/components/Program";
import Staff from "@/components/Staff";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <div className="md:max-w-[80%] max-w-[90%] mx-auto">
      <Hero />
      {/* <Services /> */}
      <Program />
      <Staff />
    </div>
  );
}
