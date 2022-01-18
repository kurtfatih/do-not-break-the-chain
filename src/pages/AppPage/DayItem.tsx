import React from 'react';
import styled from 'styled-components';

import {
    goalDataType,
    goalTypeUpdatableFieldType,
    selectedDaysDataType,
} from '../../types/dbTypes';
import {
    breakPoints,
    greenColor,
    orangeColor,
} from '../../constants/stylesConstants';
import { replaceObjInsideArrayWithExistOneByYear } from '../../utils/arrUtils';

interface DayItemProps {
    day: number;
    selectedDay?: boolean;
    isItToday: boolean;
    isOnTheFuture: boolean;
    isOnThePast: boolean;
    updateGoal: (
        fieldsToUpdate: goalTypeUpdatableFieldType,
        activeGoalData: goalDataType,
    ) => void;
    getTheSelectedDaysInTheMonthViaYear: (
        activeYear: number,
        selectedDaysInTheMonth: selectedDaysDataType,
    ) => number[] | undefined;
    goalData: goalDataType;
    activeYear: number;
    activeIndexOfMonth: number;
}

const DayItem: React.FC<DayItemProps> = ({
    day,
    selectedDay,
    isItToday,
    isOnTheFuture,
    isOnThePast,
    activeIndexOfMonth,
    activeYear,
    getTheSelectedDaysInTheMonthViaYear,
    goalData,
    updateGoal,
}) => {
    const [isSelectedLocal, setIsSelectedLocal] = React.useState(false);
    const selectDayOnClick = () => {
        if (!isItToday || selectedDay) return;
        //TODO
        // isYearAndMonthHasAlreadySelectedDayBefore
        // if not just push into selectedDaysInTheMonth
        // if exist keep other same push the day inside days and push
        const getTheSelectedDays = getTheSelectedDaysInTheMonthViaYear(
            activeYear,
            goalData.selectedDaysInTheMonth,
        );
        if (getTheSelectedDays) {
            const newSelectedDays = {
                year: activeYear,
                month: activeIndexOfMonth,
                days: [...getTheSelectedDays, day],
            };
            const newSelectedYearsArray =
                replaceObjInsideArrayWithExistOneByYear(
                    goalData.selectedDaysInTheMonth,
                    newSelectedDays,
                );

            updateGoal(
                {
                    selectedDaysInTheMonth: newSelectedYearsArray,
                    totalSelectedDaysNumber:
                        goalData.totalSelectedDaysNumber + 1,
                },
                goalData,
            );
        } else {
            updateGoal(
                {
                    selectedDaysInTheMonth: [
                        ...goalData.selectedDaysInTheMonth,
                        {
                            year: activeYear,
                            month: activeIndexOfMonth,
                            days: [day],
                        },
                    ],
                    totalSelectedDaysNumber:
                        goalData.totalSelectedDaysNumber + 1,
                },
                goalData,
            );
        }

        // const isYearAndMonthHasAlreadySelectedDayBefore =
        //     goalData.selectedDaysInTheMonth.some(({ year }) =>
        //     );

        // const newSelectedDay = {year:activeYear,month:activeIndexOfMonth,days:[...goalData.selectedDaysInTheMonth,]}
        // updateGoal({selectedDaysInTheMonth:[...goalData.selectedDaysInTheMonth,]})
        return setIsSelectedLocal(true);
    };
    return (
        <>
            <Day
                onClick={selectDayOnClick}
                isSelected={selectedDay || (isItToday && isSelectedLocal)}
                isSelecTable={isItToday && !selectedDay}
                isOnThePast={isOnThePast}
                isOnTheFuture={isOnTheFuture}
            >
                {day.toString()}
            </Day>
            {!isOnTheFuture ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexBasis: '2%',
                    }}
                >
                    <Line color={selectedDay ? greenColor : orangeColor} />
                </div>
            ) : null}
        </>
    );
};
export default DayItem;

const Line = styled.span<{ color: string }>`
    display: flex;
    width: 100%;
    border-top: 5px solid ${({ color }) => color};
    border-radius: 10px;
    position: relative;
    bottom: -3px;
`;

export const Day = styled.li<{
    isSelected?: boolean;
    isSelecTable: boolean;
    isOnThePast: boolean;
    isOnTheFuture: boolean;
}>`
    color: #fff;
    background-color: ${({ isSelected, isOnThePast, isOnTheFuture }) => {
        if (isSelected) {
            return greenColor;
        }
        if (isOnThePast) {
            return orangeColor;
        }
        if (isOnTheFuture) {
            return 'gray';
        }
        return 'gray';
    }};
    padding: 20px 10px 20px 10px;
    border-radius: 10px;
    min-width: 50px;
    cursor: ${({ isSelecTable }) => (isSelecTable ? 'pointer' : 'unset')};
    &:hover {
        background-color: ${({ isSelecTable }) =>
            isSelecTable ? greenColor : 'none'};
    }
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    text-align: left;
    @media (max-width: ${breakPoints.md}) {
        min-width: 15px;
        min-height: 9px;
        max-width: 15px;
        max-height: 9px;
    }
`;
