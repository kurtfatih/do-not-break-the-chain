import { Timestamp } from 'firebase/firestore';
import { dateUtils } from '../utils/dateUtils';

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

const now = Timestamp.now();
const nowToDate = dateUtils.timestampToDate(now);
const { month, year, day } = dateUtils.parseTheDate(nowToDate);
const todayMonth = month;
const todayMonthName = months[todayMonth];
const todayYear = year;
const todayDays = day;
// const todayDateDays = getNumberOfDaysInMonth(todayDate);

export {
    now,
    nowToDate,
    todayYear,
    todayMonthName,
    todayDays,
    // todayDateDays,
    todayMonth,
};
