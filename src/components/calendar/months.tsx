import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "../../hooks/calendar";
import { getMonth } from "../../utils/calendar";
import Button from "../ui/button";

export default function Month() {
  const { totalDays, month, year, nextMonth, prevMonth } = useCalendar();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const fillEmptyCells = lastDayOfMonth + firstDayOfMonth;
  return (
    <section className="p-4 bg-white rounded-md">
      <header className="flex justify-end gap-4  items-center mb-4">
        <div className="text-lg font-semibold">
          {getMonth(month)} {year}
        </div>
        <Button
          size="sm"
          onClick={prevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          <ChevronLeft />
        </Button>

        <Button
          size="sm"
          onClick={nextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          <ChevronRight />
        </Button>
      </header>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
            <div key={dayName} className="font-bold">
              {dayName}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 w-full h-[calc(100vh-20rem)]">
          {Array.from({ length: fillEmptyCells }, (_, index) => {
            const day = index - firstDayOfMonth + 1;
            const isPositiveDay = day > 0 && day <= totalDays;
            return (
              <div
                key={index}
                className={`flex justify-end items-start p-4 hover:bg-gray-100 border border-gray-200 ${
                  !isPositiveDay ? "bg-gray-50" : ""
                }`}
              >
                {isPositiveDay && day}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
