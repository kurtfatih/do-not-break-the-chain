import React, { createContext, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { months, todayMonth, todayYear } from '../constants/dateConstants';
import { GoalDataI, GoalTextsType, SelectedDaysType } from '../types/dbTypes';
import { generateArrayFromNumber } from '../utils/arrUtils';
import {
    getNumberOfDaysInMonth,
    parseTheDate,
    timestampToDate,
} from '../utils/dateUtils';
import { checkIfTwoNumberAreEqual } from '../utils/numberUtils';

interface DateContextProviderProps {
    goalData: GoalDataI;
}

interface DateContextI {
    activeMonthName: string;
    activeYear: number;
    activeDate: Date;
    activeNumberOfDaysInCurrentMonth: number;
    goalData: GoalDataI;
    activeIndexOfMonth: number;
    changeMonth: (indexOfMonth: number) => void;
    changeYear: (year: number) => void;

    getTheGoalTextByActiveDate: () => string | undefined;
    isTheSelectedDayMatchWithTheDayInTheComponent: (
        day: number,
    ) => boolean | undefined;

    getTheSelectedDaysInMonthByActiveDate: () => SelectedDaysType | undefined;
    generateNumberArrayByNumberOfDaysInActiveMonth: number[];
}

const DateContext = createContext<DateContextI | null>(null);

export function useDateContext() {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error(
            'use DateContext provider must be used within the DateContext.Provider',
        );
    }
    return context;
}

export const DateContextProvider: React.FC<DateContextProviderProps> = ({
    children,
    goalData,
}) => {
    const { year, month } = useParams(); //goal id year month from router
    const { selectedDays, createdAt, goalTexts } = goalData;

    const goalCreatedAtToDate = timestampToDate(createdAt);
    const goalYearParamToNumber = year
        ? Number(year)
        : parseTheDate(goalCreatedAtToDate).year; // convert year string to num
    const goalMonthParamToNumber = month
        ? Number(month) >= 12 || Number(month) < 0
            ? 0
            : Number(month)
        : parseTheDate(goalCreatedAtToDate).month; // convert month string to num
    const currentYear = goalYearParamToNumber;
    const currentMonth = goalMonthParamToNumber;

    // console.log(
    //     currentYear,
    //     goalMonthParamToNumber,
    //     currentMonth,
    //     goalMonthParamToNumber >= 12,
    // );
    const [activeMonthName, setActiveMonthName] = React.useState(
        () => months[currentMonth],
    );
    const [activeIndexOfMonth, setActiveIndexOfMonth] = React.useState(
        () => currentMonth,
    );
    const [activeYear, setActiveYear] = React.useState(() => currentYear);
    const [
        activeNumberOfDaysInCurrentMonth,
        setActiveNumberOfDaysInCurrentMonth,
    ] = React.useState(() =>
        getNumberOfDaysInMonth(activeYear, activeIndexOfMonth),
    );

    const [activeDate, setActiveDate] = React.useState(
        () => new Date(activeYear, activeIndexOfMonth),
    );

    // console.log(activeDate, activeYear, activeIndexOfMonth, activeMonthName);
    const generateNumberArrayByNumberOfDaysInActiveMonth = React.useMemo(() => {
        const days = generateArrayFromNumber(activeNumberOfDaysInCurrentMonth);
        return days;
    }, [activeNumberOfDaysInCurrentMonth]);

    const getTheGoalTextByActiveDate = () => {
        if (goalTexts?.length === 0 || !goalTexts) return;
        const goalTextObj = goalTexts.filter(
            ({ date }) =>
                parseTheDate(date.toDate()).year ===
                parseTheDate(activeDate).year,
        );
        if (goalTextObj.length === 0) return;
        const goalText = goalTextObj[goalTextObj.length - 1].text;
        return goalText;
    };

    const getTheSelectedDaysInMonthByActiveDate = React.useCallback(() => {
        const parsedActiveDate = parseTheDate(activeDate);
        if (!selectedDays || selectedDays.length < 0) return;
        const selectedDaysInMonth = selectedDays.filter((obj) => {
            const { month, year } = parseTheDate(timestampToDate(obj.date));
            if (
                checkIfTwoNumberAreEqual(month, parsedActiveDate.month) &&
                checkIfTwoNumberAreEqual(year, parsedActiveDate.year)
            ) {
                return obj;
            }
        });
        if (selectedDaysInMonth.length === 0) return;
        return selectedDays;
    }, [activeDate, selectedDays]);

    const isTheSelectedDayMatchWithTheDayInTheComponent = React.useCallback(
        (day: number) => {
            const pureDaySelected = getTheSelectedDaysInMonthByActiveDate();
            if (!pureDaySelected) return;
            const isDaySelected = pureDaySelected.some(
                ({ date }) => parseTheDate(timestampToDate(date)).day === day,
            );
            return isDaySelected;
        },
        [getTheSelectedDaysInMonthByActiveDate],
    );

    const changeMonth = useCallback(
        (indexOfMonth: number) => {
            setActiveMonthName(months[indexOfMonth]);
            setActiveIndexOfMonth(indexOfMonth);
            const newNumberOfDaysInActiveMonth = getNumberOfDaysInMonth(
                activeYear,
                indexOfMonth,
            );
            setActiveNumberOfDaysInCurrentMonth(newNumberOfDaysInActiveMonth);
            setActiveDate(new Date(activeYear,indexOfMonth))
        },
        [activeYear],
    );
    const changeYear = useCallback(
        (year: number) => {
            setActiveYear(year);
            const newNumberOfDaysInActiveMonth = getNumberOfDaysInMonth(
                year,
                activeIndexOfMonth,
            );
            setActiveNumberOfDaysInCurrentMonth(newNumberOfDaysInActiveMonth);
            setActiveDate(new Date(year,activeIndexOfMonth))
        },
        [activeIndexOfMonth],
    );
    // React.useEffect(() => {
    //     setActiveDate(new Date(activeYear, activeIndexOfMonth, 0));
    // }, [changeYear, changeMonth, activeYear, activeIndexOfMonth]);
    // const whereIsTheDateCompareToTodayDate = (dateWillCompareToToday: Date) => {
    //   // const { isOnTheFuture, isOnThePast, isOnTheTime } =
    //   //   locationOfTheDateCompareToOtherDate(todayDate, dateWillCompareToToday)
    //   return { isOnTheFuture, isOnThePast, isOnTheTime }
    // }

    return (
        <DateContext.Provider
            value={{
                activeMonthName,
                activeYear,
                activeNumberOfDaysInCurrentMonth,
                activeIndexOfMonth,
                activeDate,
                changeMonth,
                changeYear,
                // whereIsTheDateCompareToTodayDate,
                isTheSelectedDayMatchWithTheDayInTheComponent,
                generateNumberArrayByNumberOfDaysInActiveMonth,
                goalData,
                getTheGoalTextByActiveDate,
                getTheSelectedDaysInMonthByActiveDate,
            }}
        >
            {children}
        </DateContext.Provider>
    );
};
