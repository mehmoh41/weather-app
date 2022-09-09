import React from "react";
import Header from "./content/Header";
import TodayReport from "./content/TodayReport";
import Week from "./content/Week";

export default function Content() {
  return (
    <section className="col-span-12 lg:col-span-9 sm:col-span-8  w-full bg-gray-50 px-2 md:px-4">
      <div className="ml-4 mr-4 md:ml-8 md:mr-8">
        <Header />
        <Week />
        <TodayReport />
      </div>
    </section>
  );
}