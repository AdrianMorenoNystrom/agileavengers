const getDateWeek = (date) => {
    const currentDate =
        (typeof date === 'object') ? date : new Date();
    const januaryFirst =
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday =
        (januaryFirst.getDay() === 1) ? 0 :
            (7 - januaryFirst.getDay()) % 7;
    const nextMonday =
        new Date(currentDate.getFullYear(), 0,
            januaryFirst.getDate() + daysToNextMonday);

    return (currentDate < nextMonday) ? 52 :
        (currentDate > nextMonday ? Math.ceil(
            (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
};

const GetWeekNumber = () => {
    const weekNumber = getDateWeek(new Date());

    return weekNumber;
};

export default GetWeekNumber;

// const generateLastWeek = () => {
//     const currentDate = new Date();
//     const startOfWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

//     while (startOfWeek.getDay() !== 1) {
//         startOfWeek.setDate(startOfWeek.getDate() - 1);
//     }

//     const weekDays = [];

//     for (let i = 0; i < 7; i++) {
//         const currentDay = new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
//         const dateFormatter = new Intl.DateTimeFormat('en', { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' });
//         const dateString = dateFormatter.format(currentDay);
//         weekDays.push(`${dateString}`);
//     }

//     return weekDays;
// };
