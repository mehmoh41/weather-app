import React from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

export default function Wrapper() {
  return (
    <section id="wrapper" className="grid grid-cols-12">
      <Sidebar />
      <Content />
    </section>
  );
}
