import useCalendar from "../../hooks/calendar";
import Button from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useState } from "react";
import { sessionContext } from "../../context/sessionContext";
import SessionForm from "./sessionModal";

export default function SingleDay() {
  const { prevDay, nextDay, currentDay } = useCalendar();
  const { sessions } = useContext(sessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const timeLine = Array.from({ length: 13 }, (_, index) => index + 8);
  const [sessionForm, setSessionForm] = useState({
    case: "",
    claimant: "",
    respondent: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleSessionForm = (edit = false) => {
    setIsEditMode(edit);
    setIsOpen((prev) => !prev);
    
    if (!edit) {
      // Reset form when opening for new session
      setSessionForm({
        case: "",
        claimant: "",
        respondent: "",
        date: currentDay.toISOString().split('T')[0],
        startTime: "",
        endTime: "",
      });
    }
  };
  return (
    <section className="p-4 bg-white rounded-md">
      <SessionForm 
            isOpen={isOpen} 
            handleClose={handleSessionForm} 
            isEditMode={isEditMode}
            sessionForm={sessionForm}
          />
      <header className="flex justify-end  items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {currentDay.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
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
          {timeLine.map((time, index) => (
            <div
              key={index}
              className="h-20 border-b border-gray-200 text-sm text-right pr-2 flex items-start justify-end pt-1"
            >
              <span className="text-gray-500">{time}:00</span>
            </div>
          ))}
        </div>

        <div>
          {timeLine.map((hour, index) => (
            <div
              key={index}
              className="h-20 border-b border-gray-200 relative hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleSessionForm(false)}
            >
              {sessions
                ?.filter((session) => {
                  const sessionDate =
                    session.date instanceof Date
                      ? session.date
                      : new Date(session.date);
                  

                   
                  return (
                    sessionDate.getDate() === currentDay.getDate() &&
                    sessionDate.getMonth() === currentDay.getMonth() &&
                    sessionDate.getFullYear() === currentDay.getFullYear()
                  );
                })
                .map((session, idx) => {
                  const [startHour, startMinute] = session.startTime.split(":");
                  const [endHour, endMinute] = session.endTime.split(":");

                  const sessionStartHour = parseInt(startHour);
                  const sessionEndHour = parseInt(endHour);
                 
                  
                  if (hour === sessionStartHour) {
                    const {_arbitrator, ...otherData} = session;
                    const durationInHours =
                      sessionEndHour -
                      sessionStartHour +
                      parseInt(endMinute) / 60 -
                      parseInt(startMinute) / 60;
                  
                    return (
                      <div
                        key={idx}
                        className="absolute top-0 left-1 right-1 bg-blue-100 border border-blue-200 text-blue-800 px-2 py-1 rounded-md z-10 overflow-hidden"
                        style={{
                          height: `${durationInHours * 80}px`,
                          marginTop: `${(parseInt(startMinute) / 60) * 80}px`,
                          zIndex: 20,
                          pointerEvents: "auto"
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionForm({
                            ...otherData,
                            date: otherData.date instanceof Date 
                              ? otherData.date.toISOString().split('T')[0] 
                              : new Date(otherData.date).toISOString().split('T')[0]
                          });
                          handleSessionForm(true);
                        }}
                      >
                        <div className="font-medium truncate">
                          {session.case}
                        </div>
                        <div className="text-xs">
                          {session.startTime} - {session.endTime}
                        </div>
                        <div className="text-xs truncate">
                          {session.claimant} vs {session.respondent}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
