import { useState, useEffect } from "react";
import useCalendar from "../../hooks/calendar";
import Button from "../ui/button";
import { getWeekDates } from "../../utils/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeekDay() {
  const { prevWeek, nextWeek, currentWeek:currentDate } = useCalendar();
  const [weekDates, setWeekDates] = useState(getWeekDates());
  
  // Update week dates when current date changes
  useEffect(() => {
    setWeekDates(getWeekDates());
  }, [currentDate]);
  
  // Handle navigation
  const handlePrevWeek = () => {
    prevWeek();
  };
  
  const handleNextWeek = () => {
    nextWeek();
  };
  
  // Create time slots from 8 AM to 8 PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8);
  
  return (
    <section className="p-4 bg-white rounded-md">
      <header className="flex justify-end items-center gap-4 mb-4">
        <Button
          size="sm"
          onClick={handlePrevWeek}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          <ChevronLeft />
        </Button>
        <div className="text-lg font-semibold">
          {`${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
        </div>
        <Button
          size="sm"
          onClick={handleNextWeek}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          <ChevronRight />
        </Button>
      </header>
      
      {/* Week header with days */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="h-12 border-r border-gray-200"></div>
        {weekDates.map((date, index) => (
          <div 
            key={index} 
            className={`h-12 flex flex-col items-center justify-center font-semibold border-r border-gray-200 ${
              date.toDateString() === new Date().toDateString() ? 'bg-blue-50' : ''
            }`}
          >
            <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div>{date.getDate()}</div>
          </div>
        ))}
      </div>
      
      {/* Time grid */}
      <div className="grid grid-cols-8 h-[calc(100vh-12rem)] overflow-y-auto">
        {/* Time labels */}
        <div className="col-span-1">
          {timeSlots.map((hour, index) => (
            <div 
              key={index} 
              className="h-20 border-b border-r border-gray-200 text-sm text-right pr-2 pt-0"
            >
              {`${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'PM' : 'AM'}`}
            </div>
          ))}
        </div>
        
        {/* Day columns */}
        {weekDates.map((_, dayIndex) => (
          <div key={dayIndex} className="col-span-1">
            {timeSlots.map((_, hourIndex) => (
              <div 
                key={hourIndex} 
                className="h-20 border-b border-r border-gray-200 hover:bg-gray-50"
              >
                {/* Event cells would go here */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}