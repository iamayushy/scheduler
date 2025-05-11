import { useState } from "react";

export default function useCalendar() {
  const now = new Date();
  const initialYear = now.getFullYear();
  const initialMonth = now.getMonth();

  const getTotalDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [totalDays, setTotalDays] = useState(() =>
    getTotalDaysInMonth(initialYear, initialMonth)
  );
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [currentDay, setCurrentDay] = useState<Date>(new Date());

  const nextDay = () => {
    const nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 1);
    setCurrentDay(nextDay);
  };
  const prevDay = () => {
    const prevDay = new Date(currentDay);
    prevDay.setDate(currentDay.getDate() - 1);
    setCurrentDay(prevDay);
  };
  const nextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const prevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      setTotalDays(getTotalDaysInMonth(year + 1, 0));
    } else {
      const nextMonth = month + 1;
      setMonth(nextMonth);
      setTotalDays(getTotalDaysInMonth(year, nextMonth));
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      setTotalDays(getTotalDaysInMonth(year - 1, 11));
    } else {
      const prevMonth = month - 1;
      setMonth(prevMonth);
      setTotalDays(getTotalDaysInMonth(year, prevMonth));
    }
  };

  return {
    year,
    month,
    totalDays,
    currentWeek,
    currentDay,
    nextDay,
    prevDay,
    nextWeek,
    prevWeek,
    nextMonth,
    prevMonth,
  };
}
