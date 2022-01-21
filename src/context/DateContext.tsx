import { Timestamp } from '@firebase/firestore';
import React, { createContext, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { months } from '../constants/dateConstants';
import { GoalDataI, SelectedDaysType } from '../types/dbTypes';
import { generateArrayFromNumber } from '../utils/arrUtils';
import { dateUtils } from '../utils/dateUtils';
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
    isTheSelectedDayMatchWithTheDayInTheComponent: (day: number) => boolean;
    getTheSelectedDayTextByDate: (
        selectedDayTimestamp: Timestamp,
    ) => string | undefined;
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

    const goalCreatedAtToDate = dateUtils.timestampToDate(createdAt);
    const goalYearParamToNumber = year
        ? Number(year)
        : dateUtils.parseTheDate(goalCreatedAtToDate).year; // convert year string to num
    const goalMonthParamToNumber = month
        ? Number(month) >= 12 || Number(month) < 0
            ? 0
            : Number(month)
        : dateUtils.parseTheDate(goalCreatedAtToDate).month; // convert month string to num
    const currentYear = goalYearParamToNumber;
    const currentMonth = goalMonthParamToNumber;

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
        dateUtils.getNumberOfDaysInMonth(activeYear, activeIndexOfMonth),
    );

    const [activeDate, setActiveDate] = React.useState(
        () => new Date(activeYear, activeIndexOfMonth),
    );

    const generateNumberArrayByNumberOfDaysInActiveMonth = React.useMemo(() => {
        const days = generateArrayFromNumber(activeNumberOfDaysInCurrentMonth);
        return days;
    }, [activeNumberOfDaysInCurrentMonth]);

    const getTheGoalTextByActiveDate = () => {
        if (goalTexts?.length === 0 || !goalTexts) return;
        const goalTextObj = goalTexts.filter(
            ({ date }) =>
                dateUtils.parseTheDate(date.toDate()).year ===
                dateUtils.parseTheDate(activeDate).year,
        );
        if (goalTextObj.length === 0) return;
        const goalText = goalTextObj[goalTextObj.length - 1].text;
        return goalText;
    };

    const getTheSelectedDaysInMonthByActiveDate = React.useCallback(() => {
        const parsedActiveDate = dateUtils.parseTheDate(activeDate);
        if (!selectedDays || selectedDays.length < 0) return;
        const selectedDaysInMonth = selectedDays.filter((obj) => {
            const { month, year } = dateUtils.parseTheDate(
                dateUtils.timestampToDate(obj.date),
            );
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

    const getTheSelectedDayTextByDate = (selectedDayTimestamp: Timestamp) => {
        if (!goalData.selectedDays) return;
        const selectedday = goalData.selectedDays.find(({ date }) =>
            date.isEqual(selectedDayTimestamp),
        );
        const selectedDayText = selectedday?.note;
        return selectedDayText;
    };
    const isTheSelectedDayMatchWithTheDayInTheComponent = React.useCallback(
        (day: number) => {
            const pureDaySelected = getTheSelectedDaysInMonthByActiveDate();
            if (!pureDaySelected) return false;
            const isDaySelected = pureDaySelected.some(
                ({ date }) =>
                    dateUtils.parseTheDate(dateUtils.timestampToDate(date))
                        .day === day,
            );
            return isDaySelected;
        },
        [getTheSelectedDaysInMonthByActiveDate],
    );

    const changeMonth = useCallback(
        (indexOfMonth: number) => {
            setActiveMonthName(months[indexOfMonth]);
            setActiveIndexOfMonth(indexOfMonth);
            const newNumberOfDaysInActiveMonth =
                dateUtils.getNumberOfDaysInMonth(activeYear, indexOfMonth);
            setActiveNumberOfDaysInCurrentMonth(newNumberOfDaysInActiveMonth);
            setActiveDate(new Date(activeYear, indexOfMonth));
        },
        [activeYear],
    );
    const changeYear = useCallback(
        (year: number) => {
            setActiveYear(year);
            const newNumberOfDaysInActiveMonth =
                dateUtils.getNumberOfDaysInMonth(year, activeIndexOfMonth);
            setActiveNumberOfDaysInCurrentMonth(newNumberOfDaysInActiveMonth);
            setActiveDate(new Date(year, activeIndexOfMonth));
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
                getTheSelectedDayTextByDate,
            }}
        >
            {children}
        </DateContext.Provider>
    );
};
