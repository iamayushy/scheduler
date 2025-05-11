import  { type ComponentType } from 'react';

interface CalendarActionProps {
  date?: Date;
  onDateSelect?: (date: Date) => void;
}

export default function withCalendarAction<P extends object>(
  WrappedComponent: ComponentType<P & CalendarActionProps>
) {
  return function WithCalendarAction(props: P) {
    const handleDateSelect = (date: Date) => {
      console.log('Selected date:', date);
    };


    return (
      <section className="calendar-action-wrapper">
        <WrappedComponent 
          {...props}
          onDateSelect={handleDateSelect}
        />
      </section>
    );
  };
}