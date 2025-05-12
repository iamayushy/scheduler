import { useState } from "react";
import { getView } from "../../utils/calendar";

import DropDown from "../ui/dropDown";
import Month from "./months";
import WeekDay from "./weekDay";
import SingleDay from "./singleDay";

export default function Calendar() {
  const [switchMode, setSwitchMode] = useState("week");

  return (
    <section className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
        <DropDown
          selected={switchMode}
          options={getView()}
          onChange={(mode) => setSwitchMode(mode)}
        />
      </div>

      <div className="w-full h-full  rounded-lg  bg-white p-1">
        {switchMode === "month" && <Month />}
        {switchMode === "week" && <WeekDay />}
        {switchMode === "day" && <SingleDay />}
      </div>
    </section>
  );
}
