import React, { useState, useEffect } from "react";
import { WeatherProvider } from "../context/weather";
import Content from "./Content";
import Sidebar from "./Sidebar";

export default function Wrapper() {
  return (
    <WeatherProvider>
      <section id="wrapper" className="grid grid-cols-12">
        <Sidebar />
        <Content />
      </section>
    </WeatherProvider>
  );
}
