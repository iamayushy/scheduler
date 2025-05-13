import { useContext, useEffect, useState } from "react";
import Input from "../ui/input";
import { userContext } from "../../context/userContext";
import Button from "../ui/button";
import { sessionContext } from "../../context/sessionContext";
import DropDown from "../ui/dropDown";
import { cases } from "../../mock/cases";
import getTiming from "../../utils/calendar";

interface FormProps {
  onSubmit: () => void;
  isEditing?: boolean;
  updateFormData?: {
    case: string;
    claimant: string;
    respondent: string;
    date: string;
    startTime: string;
    endTime: string;
  }
}

export default function Form({onSubmit, updateFormData, isEditing}: FormProps) {
  const { name, email } = useContext(userContext);
  const { createSession, updateSession, sessions } = useContext(sessionContext);
  const [formData, setFormData] = useState({
    case: "",
    claimant: "",
    respondent: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (updateFormData) {
      setFormData(updateFormData);
    }
  }, [updateFormData]);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleDrop = (data: {name: string, value: string}) => {
    const { name, value } = data;
    
    // When case changes, update claimant and respondent
    if (name === "case") {
      const selectedCase = cases.find(c => c.case_id === value);
      setFormData({
        ...formData,
        [name]: value,
        claimant: selectedCase?.claimant || "",
        respondent: selectedCase?.respondent || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const allCases = cases.map((it) => {
    return {
      label: it.case_id,
      value: it.case_id,
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validate all required fields
    if (!formData.case || !formData.date || !formData.startTime || !formData.endTime) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (formData.startTime >= formData.endTime) {
      setError("End time must be later than start time");
      return;
    }
    
    const formDate = new Date(formData.date);
    const [formStartHour, formStartMinute] = formData.startTime.split(':').map(Number);
    const [formEndHour, formEndMinute] = formData.endTime.split(':').map(Number);
    
    const overlappingSessions = sessions.filter(session => {
      if (isEditing && 
          session.case === formData.case && 
          new Date(session.date).toISOString().split('T')[0] === formDate.toISOString().split('T')[0] &&
          session.startTime === formData.startTime) {
        return false;
      }
      
      const sessionDate = session.date instanceof Date ? 
        session.date : new Date(session.date);
      
      const isSameDay = sessionDate.toISOString().split('T')[0] === formDate.toISOString().split('T')[0];
      
      if (!isSameDay) return false;
      
      const [sessionStartHour, sessionStartMinute] = session.startTime.split(':').map(Number);
      const [sessionEndHour, sessionEndMinute] = session.endTime.split(':').map(Number);
      
      const formStart = formStartHour * 60 + formStartMinute;
      const formEnd = formEndHour * 60 + formEndMinute;
      const sessionStart = sessionStartHour * 60 + sessionStartMinute;
      const sessionEnd = sessionEndHour * 60 + sessionEndMinute;
      
      return (
        (formStart >= sessionStart && formStart < sessionEnd) || 
        (formEnd > sessionStart && formEnd <= sessionEnd) ||     
        (formStart <= sessionStart && formEnd >= sessionEnd)     
      );
    });
    
    if (overlappingSessions.length > 0) {
      setError(`This time slot overlaps with existing session(s): ${overlappingSessions.map(s => `${s.case} (${s.startTime}-${s.endTime})`).join(', ')}`);
      return;
    }
    
    const session = {
      arbitrator: {
        name,
        email,
        id: "1",
      },
      case: formData.case,
      claimant: cases.filter((it) => it.case_id === formData.case)[0]?.claimant || formData.claimant,
      respondent: cases.filter((it) => it.case_id === formData.case)[0]?.respondent || formData.respondent,
      date: new Date(formData.date),
      startTime: formData.startTime,
      endTime: formData.endTime,
    };
    
    try {
      if (isEditing) {
        // Update existing session
        updateSession(session);
        console.log("Session updated:", session);
        setSuccess("Session updated successfully!");
        onSubmit();
        return;
      }
      createSession(session);
      console.log("Session created:", session);
      
      setFormData({
        case: "",
        claimant: "",
        respondent: "",
        date: "",
        startTime: "",
        endTime: "",
      });
      
      setSuccess("Session created successfully!");
      onSubmit();
    } catch (err) {
      setError("Failed to create session. Please try again.");
      console.error("Session creation error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {error && <div className="p-2 text-red-500 border border-red-300 bg-red-50 rounded">{error}</div>}
          {success && <div className="p-2 text-green-500 border border-green-300 bg-green-50 rounded">{success}</div>}
          
          <Input required readOnly label="Arbitrator" value={name} />
          <DropDown name="case" label="Case" 
          onChange={(val) => handleDrop({name: "case", value: val})}
          selected={formData.case}
          options={allCases}  />
          <Input
            required
            placeholder={`${new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}`}
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          <div className="flex items-center gap-4 justify-between">
            <DropDown required label="Start Time" options={getTiming()} 
                    onChange={(val) => handleDrop({name: "startTime", value: val})} 
                    selected={formData.startTime}/>
            <DropDown required label="End Time" options={getTiming()} 
                    onChange={(val) => handleDrop({name: "endTime", value: val})} 
                    selected={formData.endTime}/>
          </div>
          <Input
            required
            type="email"
            placeholder="claimant@man.com"
            name="claimant"
            label="Claimant Email"
            value={formData.claimant}
            onChange={handleChange}
          />
          <Input
            required
            type="email"
            name="respondent"
            placeholder="respondent@tan.com"
            label="Respondent Email"
            value={formData.respondent}
            onChange={handleChange}
          />
          <Button type="submit">{
            isEditing ? "Update" : "Schedule"
            }</Button>
        </div>
      </form>
    </div>
  );
}
