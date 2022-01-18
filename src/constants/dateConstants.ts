import { parseTheDate } from '../utils/dateUtils';

export const months = [
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

const todayDate = new Date();
const { month, year, day } = parseTheDate(todayDate);
const todayMonth = month;
const todayMonthName = months[todayMonth];
const todayYear = year;
const todayDays = day;
// const todayDateDays = getNumberOfDaysInMonth(todayDate);

export {
    todayDate,
    todayYear,
    todayMonthName,
    todayDays,
    // todayDateDays,
    todayMonth,
};
