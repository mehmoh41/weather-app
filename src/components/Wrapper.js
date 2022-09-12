import React from "react";
import {
  CentrigradeProvider,
  LatLonProvider,
  ToggleWeeklyDailyProvider,
  WeatherProvider,
} from "../context/weather";
import Content from "./Content";
import Sidebar from "./Sidebar";

export default function Wrapper() {
  return (
    <WeatherProvider>
      <LatLonProvider>
        <CentrigradeProvider>
          <section id="wrapper" className="grid grid-cols-12">
            <Sidebar />
            <ToggleWeeklyDailyProvider>
              <Content />
            </ToggleWeeklyDailyProvider>
          </section>
        </CentrigradeProvider>
      </LatLonProvider>
    </WeatherProvider>
  );
}
