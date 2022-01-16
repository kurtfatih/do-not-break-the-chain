import React, { createContext, useCallback, useContext } from 'react';

import { months, todayMonth, todayYear } from '../constants/dateConstant';
import { goalDataType } from '../constants/dbconstant';
import { generateArrayFromNumber } from '../utils/arrUtils';
import { getNumberOfDaysInMonth } from '../utils/dateUtils';

interface DateContextProviderProps {
    goalYear?: number;
    goalMonth?: number;
    goalData: goalDataType;
}

interface DateContextI {
    activeMonthName: string;
    activeYear: number;
    activeNumberOfDaysInCurrentMonth: number;
    goalData: goalDataType;
    activeIndexOfMonth: number;
    changeMonth: (indexOfMonth: number) => void;
    changeYear: (year: number) => void;
    isTheSelectedDayMatchWithTheDayInTheComponent: (
        day: number,
    ) => boolean | undefined;
    generateNumberArrayByNumberOfDaysInActıveMonth: number[];
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
    goalYear,
    goalMonth,
    goalData,
}) => {
    const year = goalYear ?? todayYear;
    const month = goalMonth ? (goalMonth >= 12 ? 0 : goalMonth) : todayMonth;
    const { selectedDaysInTheMonth } = goalData;
    const [activeMonthName, setActiveMonthName] = React.useState(months[month]);
    const [activeIndexOfMonth, setActiveIndexOfMonth] = React.useState(month);
    const [activeYear, setActiveYear] = React.useState(year);
    const [
        activeNumberOfDaysInCurrentMonth,
        setActiveNumberOfDaysInCurrentMonth,
    ] = React.useState(getNumberOfDaysInMonth(year, month));

    const generateNumberArrayByNumberOfDaysInActıveMonth = React.useMemo(() => {
        const days = generateArrayFromNumber(activeNumberOfDaysInCurrentMonth);
        return days;
    }, [activeNumberOfDaysInCurrentMonth]);

    const selectedDayAndMonthInActiveYear = React.useCallback(() => {
        const selectedDays = selectedDaysInTheMonth;
        if (selectedDays.length === 0) return;
        const getTheSelectedMonthAndDaysByMatchedYear = selectedDays.filter(
            (selectedDaysObj) => selectedDaysObj.year === activeYear,
        );
        if (getTheSelectedMonthAndDaysByMatchedYear.length === 0) return;
        return getTheSelectedMonthAndDaysByMatchedYear;
    }, [activeYear, selectedDaysInTheMonth]);

    const getTheSelectedDayInTheMonth = React.useCallback(() => {
        const selectedDayInYear = selectedDayAndMonthInActiveYear();
        if (!selectedDayInYear) return;
        const daysInTheMonthObj = selectedDayInYear.filter(
            ({ month }) => month === activeIndexOfMonth,
        );
        const days = daysInTheMonthObj.flatMap(({ days }) => days);
        return days;
    }, [activeIndexOfMonth, selectedDayAndMonthInActiveYear]);

    const isTheSelectedDayMatchWithTheDayInTheComponent = React.useCallback(
        (day: number) => {
            const pureDaySelected = getTheSelectedDayInTheMonth();
            if (!pureDaySelected) return;
            const isDaySelected = pureDaySelected.some(
                (selectedDay) => selectedDay === day,
            );
            return isDaySelected;
        },
        [getTheSelectedDayInTheMonth],
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
        },
        [activeIndexOfMonth],
    );
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
                changeMonth,
                changeYear,
                // whereIsTheDateCompareToTodayDate,
                isTheSelectedDayMatchWithTheDayInTheComponent,
                generateNumberArrayByNumberOfDaysInActıveMonth,
                goalData,
            }}
        >
            {children}
        </DateContext.Provider>
    );
};
