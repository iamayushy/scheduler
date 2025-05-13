import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "../../hooks/calendar";
import Button from "../ui/button";
import { getWeek } from "../../utils/calendar";
import SessionForm from "./sessionModal";
import { useContext, useState } from "react";
import { sessionContext } from "../../context/sessionContext";

function WeekDay() {
  const { currentWeek, prevWeek, nextWeek } = useCalendar();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { sessions } = useContext(sessionContext);
  const [sessionForm, setSessionForm] = useState({
    case: "",
    claimant: "",
    respondent: "",
    date: "",
    startTime: "",
    endTime: ""
  });

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
  
  const handleForm = (dayIndex: number, time: number | any, session: any = null) => {
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
      // Create new session
      const selectedDate = new Date(weekDates[dayIndex]);
      setIsEditMode(false);
      setSessionForm({
        case: "",
        claimant: "",
        respondent: "",
        date: selectedDate.toISOString().split('T')[0],
        startTime: time ? `${time.toString().padStart(2, '0')}:00` : "",
        endTime: time ? `${(time + 1).toString().padStart(2, '0')}:00` : "",
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
    <section className="p-4 bg-white h-[calc(100vh-12rem)] flex flex-col">
      <SessionForm 
        isOpen={isFormOpen} 
        handleClose={handleCloseForm}
        isEditMode={isEditMode}
        sessionForm={sessionForm}
      />

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
            <div key={dayIndex} className="border-l border-gray-300 relative">
              {timeLine.map((time, timeIndex) => (
                <div
                  key={timeIndex}
                  onClick={() => handleForm(dayIndex, time)}
                  className="h-24 border-b border-gray-300 hover:bg-gray-100 relative cursor-pointer"
                >
                  {sessions?.map((it, idx) => {
                    const sessionDate = it.date instanceof Date ? 
                      it.date : new Date(it.date);
                    const [startHour, startMinute] = it.startTime.split(":");
                    const [endHour, endMinute] = it.endTime.split(":");
                    
                    const sessionStartHour = parseInt(startHour);
                    const sessionEndHour = parseInt(endHour);
                    
                    // Check if current time slot falls within the session time period
                    const isInTimeSlot = (
                      (time === sessionStartHour) || 
                      (time > sessionStartHour && time < sessionEndHour) ||
                      (time === sessionEndHour && parseInt(endMinute) > 0)
                    );
                    
                    // Check if date matches and time slot is within session time range
                    if (sessionDate.getDate() === weekDates[dayIndex].getDate() && 
                        sessionDate.getMonth() === weekDates[dayIndex].getMonth() && 
                        sessionDate.getFullYear() === weekDates[dayIndex].getFullYear() && 
                        isInTimeSlot) {
                      
                      // Calculate height based on duration
                      const durationInHours = sessionEndHour - sessionStartHour + 
                        (parseInt(endMinute) > 0 ? parseInt(endMinute)/60 : 0) - 
                        (parseInt(startMinute) > 0 ? parseInt(startMinute)/60 : 0);
                      
                      // Only render once at the starting hour to avoid duplicates
                      const isStartingHour = time === sessionStartHour;
                      
                      return isStartingHour ? (
                        <div 
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering parent onClick
                            handleForm(dayIndex, null, it as any);
                          }}
                          className="absolute top-0 left-0 right-0 bg-blue-100 text-blue-800 px-2 py-1 rounded-md z-10 cursor-pointer hover:bg-blue-200"
                          style={{ 
                            height: `${Math.min(durationInHours * 100, 98)}%`,
                            marginTop: `${parseInt(startMinute) > 0 ? (parseInt(startMinute)/60) * 96 : 0}px`
                          }}
                        >
                          <div className="font-medium">{it.case}</div>
                          <div className="text-xs">{it.startTime} - {it.endTime}</div>
                        </div>
                      ) : null;
                    }
                    
                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeekDay;
