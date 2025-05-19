import DashboardHeader from "@/components/DashboardHeader";
import React from "react";

function page() {
  return (
    <>
      <DashboardHeader
        previousPage="Dashboard"
        currentPage="Full Stack Web Development"
      />
      <div className="md:max-w-[80%] max-w-[90%] mx-auto md:ml-12">
        <h1 className="text-2xl font-bold">Full Stack Web Development</h1>
      </div>
    </>
  );
}

export default page;
