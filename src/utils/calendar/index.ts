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


export default function getTiming() {
    const hours = [];
    for (let i = 11; i <= 16; i++) {
        const hour = i > 12 ? i - 12 : i;
        const period = i >= 12 ? 'PM' : 'AM';
        hours.push({
            label: `${hour}:00 ${period}`,
            value: `${i}:00`,
        });
        hours.push({
            label: `${hour}:30 ${period}`,
            value: `${i}:30`,
        });
    }
    return hours;
}