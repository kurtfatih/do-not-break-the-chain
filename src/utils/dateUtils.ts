import { Timestamp } from '@firebase/firestore';
export const getTheDateWithoutHours = (date: Date) => {
    return date.setHours(0, 0, 0, 0);
};

export const parseTheDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    return { year, month, day, hour };
};

export const getNumberOfDaysInMonth = (year: number, month: number) => {
    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
    return numberOfDaysInMonth;
};
export const isTheDatesAreEqual = (
    date1WithoutHours: number,
    date2WithoutHours: number,
) => {
    // without hour mean Date.setHours(0,0,0,0)
    return date1WithoutHours.valueOf() === date2WithoutHours.valueOf();
};

export const checkIfTheDatesAreExactSame = (date1: Date, date2: Date) => {
    const today = getTheDateWithoutHours(date1);
    const currentDate = getTheDateWithoutHours(date2);
    const datesEqual = isTheDatesAreEqual(today, currentDate);
    return datesEqual;
};

export const locationOfTheDateCompareToOtherDate = (
    baseDate: Date,
    dateWillCompareToBase: Date,
) => {
    const firstDate = baseDate;
    const firstDateWithoutHour = getTheDateWithoutHours(firstDate);
    const secondDate = dateWillCompareToBase;
    const secondDateWithoutHOur = getTheDateWithoutHours(secondDate);
    const firstDateParsed = parseTheDate(firstDate);
    const secondDateParsed = parseTheDate(secondDate);

    const isTheYearSame = firstDateParsed.year === secondDateParsed.year;
    const isTheSameMonth = firstDateParsed.month === secondDateParsed.month;

    const isTheDateOnThePast = secondDateWithoutHOur < firstDateWithoutHour;
    const isTheDateOnTheFuture = secondDateWithoutHOur > firstDateWithoutHour;
    const isTheDatesAreExactSame = isTheDatesAreEqual(
        firstDateWithoutHour,
        secondDateWithoutHOur,
    );

    const isTheDatesAreDifferentButSameYear = isTheYearSame && !isTheSameMonth;
    const isTheDatesAreDifferentButSameMonth = !isTheYearSame && isTheSameMonth;

    const isTheDateOnThePastButSameMonth = isTheDateOnThePast && isTheSameMonth;
    const isTheDateOnTheFutureButSameMonth =
        isTheDateOnTheFuture && isTheSameMonth;
    const isTheDateOnTheSameYearAndSameMonth = isTheYearSame && isTheSameMonth;

    return {
        isTheDateOnThePast,
        isTheDateOnTheFuture,
        isTheDatesAreExactSame,
        isTheDatesAreDifferentButSameMonth,
        isTheDatesAreDifferentButSameYear,
        isTheDateOnThePastButSameMonth,
        isTheDateOnTheFutureButSameMonth,
        isTheDateOnTheSameYearAndSameMonth,
    };
};
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
export function dateDiffInDays(firstDate: Date, secondDate: Date) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        firstDate.getDate(),
    );
    const utc2 = Date.UTC(
        secondDate.getFullYear(),
        secondDate.getMonth(),
        secondDate.getDate(),
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
export function dateToTimestamp(date: Date) {
    const timestamp = Timestamp.fromDate(date);
    return timestamp;
}
export function timestampToDate(timestamp: Timestamp) {
    const date = timestamp.toDate();
    return date;
}
export function checkIsTimestampsAreEquals(
    timestamp1: Timestamp,
    timestamp2: Timestamp,
) {
    const isEquals = timestamp1.isEqual(timestamp2);
    return isEquals;
}
