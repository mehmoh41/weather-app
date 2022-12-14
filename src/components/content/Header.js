import React, { useContext, useState } from "react";
import { CentigradeContext, ToggleWeekly } from "../../context/weather";

export default function Header() {
  const [centigrade, setCentigrade] = useContext(CentigradeContext);
  const [toggleWeekly, setToggleWeekly] = useContext(ToggleWeekly);
  const [centiColor, setCentiColor] = useState(
    "bg-green-400 border border-white text-white"
  );
  const [faranColor, setFaranColor] = useState("bg-gray-200");
  const [weeklyColor, setWeeklyColor] = useState("text-gray-400");
  const [dailyColor, setDailyColor] = useState(
    "text-blue-500 font-black border-b-2 border-blue-400 inline-block"
  );
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center">
        <h3
          className={`md:text-xl mr-2 md:mr-5 ${dailyColor} cursor-pointer hover:scale-110 tracking-wider`}
          onClick={() => {
            setToggleWeekly(false);
            setWeeklyColor("text-gray-400");
            setDailyColor(
              "text-blue-500 font-black border-b-2 border-blue-400 inline-block"
            );
          }}
        >
          Today
        </h3>
        <h3
          className={`md:text-xl ${weeklyColor} cursor-pointer hover:scale-110 tracking-wider ml-1`}
          onClick={() => {
            setToggleWeekly(true);
            setWeeklyColor(
              "text-blue-500 font-black border-b-2 border-blue-400 inline-block"
            );
            setDailyColor("text-gray-400");
          }}
        >
          Weekly
        </h3>
      </div>
      <div className="flex items-center">
        <div
          className={`${centiColor} w-10 h-10 rounded-full ml-2 cursor-pointer relative`}
          onClick={() => {
            setCentigrade(true);
            setCentiColor("bg-green-400 border border-white text-white");
            setFaranColor("bg-gray-200");
          }}
        >
          <h2 className="text-xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  -ml-[2px]">
            ??C
          </h2>
        </div>
        <div
          className={`w-10 h-10 rounded-full ${faranColor} ml-2 md:ml-4 relative cursor-pointer`}
          onClick={() => {
            setCentiColor("bg-gray-200");
            setFaranColor("bg-green-400 border border-white text-white");
            setCentigrade(false);
          }}
        >
          <h2 className="text-xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white -ml-[2px]">
            ??F
          </h2>
        </div>
      </div>
    </div>
  );
}
