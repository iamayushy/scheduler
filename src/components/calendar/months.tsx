import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "../../hooks/calendar";
import { getMonth } from "../../utils/calendar";
import Button from "../ui/button";
import { useContext, useState } from "react";
import { sessionContext } from "../../context/sessionContext";
import SessionForm from "./sessionModal";

export default function Month() {
  const { totalDays, month, year, nextMonth, prevMonth } = useCalendar();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const fillEmptyCells = lastDayOfMonth + firstDayOfMonth;
  const { sessions } = useContext(sessionContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    case: "",
    claimant: "",
    respondent: "",
    date: "",
    startTime: "",
    endTime: ""
  });
  
  const handleForm = (day: any, session: any = null) => {
    if (session) {
      setIsEditMode(true);
      setSessionForm({
        case: session.case,
        claimant: session.claimant,
        respondent: session.respondent,
        date: session.date instanceof Date ? 
          session.date.toISOString().split('T')[0] : 
          new Date(session.date).toISOString().split('T')[0],
        startTime: session.startTime,
        endTime: session.endTime,
      });
    } else {
      const selectedDate = new Date(year, month, day);
      setIsEditMode(false);
      setSessionForm({
        case: "",
        claimant: "",
        respondent: "",
        date: selectedDate.toISOString().split('T')[0],
        startTime: "09:00",
        endTime: "10:00",
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    if (!isEditMode) {
      setSessionForm({
        case: "",
        claimant: "",
        respondent: "",
        date: "",
        startTime: "",
        endTime: ""
      });
    }
  };

  

  return (
    <section className="p-4 bg-white rounded-md">
      <SessionForm 
        isOpen={isFormOpen} 
        handleClose={handleCloseForm}
        isEditMode={isEditMode}
        sessionForm={sessionForm}
      />
      
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
            
            const currentDate = new Date();
            const cellDate = new Date(year, month, day);
            const isPastDate = cellDate < new Date(currentDate.setHours(0, 0, 0, 0));
            
            const sessionsForDay = sessions.filter(session => {
              const sessionDate = new Date(session.date);
              return sessionDate.getDate() === day && 
                     sessionDate.getMonth() === month && 
                     sessionDate.getFullYear() === year;
            });
            
            return (
              <div
                key={index}
                className={`flex flex-col justify-start items-start p-4 hover:bg-gray-100 border border-gray-200 ${
                  !isPositiveDay || isPastDate ? "bg-gray-50" : "cursor-pointer"
                } ${isPastDate ? "opacity-60" : ""}`}
                onClick={() => isPositiveDay && !isPastDate && handleForm(day)}
              >
                {isPositiveDay && (
                  <>
                    <div className={`self-end ${isPastDate ? "text-gray-400" : ""}`}>{day}</div>
                    {sessionsForDay.map((session, i) => (
                      <div 
                        key={i} 
                        className="mt-2 p-2 bg-blue-100 rounded-md text-xs w-full hover:bg-blue-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleForm(day, session);
                        }}
                      >
                        <div className="font-semibold">{session.case}</div>
                        <div>{session.startTime} - {session.endTime}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
