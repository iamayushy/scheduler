export const getMonth = (month: number) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return months[month];
};

export const getWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days;
}

export const getView = () => {
    return [
        {
            label: 'Day',
            value: 'day',
        },
        {
            label: 'Week',
            value: 'week',
        },
        {
            label: 'Month',
            value: 'month',
        },
    ]
}

export const getWeekDates = () => {
    const dates = [];
    const firstDayOfWeek = new Date(new Date());
    const day = firstDayOfWeek.getDay();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - day);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
};
