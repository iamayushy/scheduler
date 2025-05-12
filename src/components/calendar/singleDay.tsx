import useCalendar from "../../hooks/calendar";
import Button from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SingleDay() {
  const { prevDay, nextDay, currentDay } = useCalendar();
  
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8);
  
  return (
    <section className="p-4 bg-white rounded-md">
      <header className="flex justify-end  items-center mb-4">
        <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">
            {currentDay.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric' 
            })}
          </h2>
          <Button
            size="sm"
            onClick={prevDay}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            
            <ChevronLeft size={18} />
          </Button>
          <Button
            size="sm"
            onClick={nextDay}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-[80px_1fr] h-[calc(100vh-18rem)] overflow-y-auto border border-gray-200 rounded-md">
        <div className="border-r border-gray-200">
          {timeSlots.map((hour, index) => (
            <div 
              key={index} 
              className="h-20 border-b border-gray-200 text-sm text-right pr-2 flex items-start justify-end pt-1"
            >
              <span className="text-gray-500">
                {`${hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`}
              </span>
            </div>
          ))}
        </div>
        
        <div>
          {timeSlots.map((_hour, index) => (
            <div 
              key={index} 
              className="h-20 border-b border-gray-200 relative hover:bg-gray-50 transition-colors"
            >
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}