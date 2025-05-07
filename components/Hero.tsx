import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight capitalize">
            Up your <span className="text-primary">Skills</span> to{" "}
            <span className="text-primary">Advance</span> your{" "}
            <span className="text-primary">career</span> path
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Learn UI-UX Design skills with weekend UX. The latest online
            learning system and material that help your knowledge growing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className="bg-primary text-white px-8 py-4 rounded-lg text-center font-semibold hover:bg-primary/80 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#"
              className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-center font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Free Trial
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[500px] mx-auto">
          <div className="absolute inset-0 bg-primary rounded-full overflow-hidden">
            <Image
              src="/hero-image.png"
              alt="Hero Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
