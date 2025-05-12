import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "../../hooks/calendar";
import Button from "../ui/button";
import { getWeek } from "../../utils/calendar";

function WeekDay() {
  const { currentWeek, prevWeek, nextWeek } = useCalendar();

  const generateWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const weekDates = generateWeekDates();
  const timeLine = Array.from({ length: 13 }, (_, index) => index + 8);

  return (
    <section className="p-4 bg-white h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex justify-end items-center mb-4 gap-4">
        <div className="font-semibold">
          {weekDates[0].getMonth() !== weekDates[6].getMonth()
            ? `${weekDates[0].toLocaleDateString("en-US", {
                month: "long",
              })} - ${weekDates[6].toLocaleDateString("en-US", {
                month: "long",
              })} ${weekDates[6].getFullYear()}`
            : weekDates[0].toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
        </div>
        <div className="flex justify-end items-center gap-1">
        <Button onClick={prevWeek} size="sm">
          <ChevronLeft />
        </Button>

        <Button onClick={nextWeek} size="sm">
          <ChevronRight />
        </Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-20 pr-2 flex-shrink-0 h-16"></div>

        <div className="flex-1 grid grid-cols-7  pb-2">
          {getWeek().map((dayName, index) => {
            const date = weekDates[index];
            return (
              <div
                key={index}
                className="text-center flex flex-col items-center py-2"
              >
                <div className="font-medium text-gray-600">{dayName}</div>
                <div
                  className={`text-lg font-bold rounded-full w-8 flex items-center justify-center`}
                >
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable area with both time column and grid */}
      <div className="flex flex-1 border-b border-t border-gray-300 overflow-y-auto">
        <div className="w-20 pr-2 flex-shrink-0">
          {timeLine.map((time, index) => (
            <div key={index} className="h-24 flex items-start sticky left-0">
              <div className="text-gray-600 text-sm">{time}:00</div>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7">
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} 
            className="border-l border-gray-300 relative">
              {timeLine.map((_time, timeIndex) => (
                <div
                  key={timeIndex}
                  // onClick={() => onDateSelect({date: weekDates[dayIndex], time})}
                  className="h-24 border-b border-gray-300 hover:bg-gray-100 relative cursor-pointer"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeekDay;