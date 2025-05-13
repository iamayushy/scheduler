/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react";


interface Session {
    arbitrator: {
        name: string;
        email: string;
        id: string;
    },
    case: string;
    claimant: string;
    respondent: string;
    date: Date;
    startTime: string;
    endTime: string;
}

const allSessions = localStorage.getItem("sessions");

let initialState = {
    sessions: [] as Session[], // Define the type for clarity
};

if (allSessions) {
    initialState = {
        sessions: JSON.parse(allSessions),
    }
}

export const sessionContext = createContext({
    ...initialState,
    createSession: (_data: any) => {},
    updateSession: (_data: any) => {},
    deleteSession: (_data: any) => {},
})

export default function SessionContext({ children }: { children: ReactNode }) {
    const [sessions, setSessions] = useState(initialState.sessions);

    const createSession = (session: Session) => {
        const newSessions = [...sessions, session];
        setSessions(newSessions);
        localStorage.setItem("sessions", JSON.stringify(newSessions));
    };

    const updateSession = (updatedSession: Session) => {
        
        const newSessions = sessions.map(session =>
            session.case === updatedSession.case ? updatedSession : session
        );
        setSessions(newSessions);
        localStorage.setItem("sessions", JSON.stringify(newSessions));
    };

    const deleteSession = (caseId: string) => {
        const newSessions = sessions.filter(session => session.case !== caseId);
        setSessions(newSessions);
        localStorage.setItem("sessions", JSON.stringify(newSessions));
    };

    return (
        <sessionContext.Provider value={{ sessions, createSession, updateSession, deleteSession }}>
            {children}
        </sessionContext.Provider>
    );
}