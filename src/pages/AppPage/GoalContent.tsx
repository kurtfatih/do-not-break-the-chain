import { Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { Card } from '../../components/Card';
// import { ContentBody } from '../../components/Layouts';
import { UnOrderedList } from '../../components/UnOrderedList';
import { nowToDate } from '../../constants/dateConstants';
import { breakPoints } from '../../constants/stylesConstants';
import { useDateContext } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { replaceObjInsideArrayWithExistOneByYear } from '../../utils/arrUtils';
import {
    dateToTimestamp,
    locationOfTheDateCompareToOtherDate,
    parseTheDate,
    timestampToDate,
} from '../../utils/dateUtils';
import DayItem from './DayItem';

export const DaysCardContainer = styled(Card)`
    display: flex;
    width: 50%;
    max-width: 590px;
    @media (max-width: ${breakPoints.lg}) {
        /* width: 100%; */
        min-width: 366px;
    }
    /* @media (max-width: ${breakPoints.md}) {
        max-height: 300px;
    } */
`;
export const GoalContent: React.FC = () => {
    const {
        activeYear,
        activeIndexOfMonth,
        isTheSelectedDayMatchWithTheDayInTheComponent,
        generateNumberArrayByNumberOfDaysInActiveMonth,
        goalData,
        getTheSelectedDaysInMonthByActiveDate,
    } = useDateContext();
    console.log('aa', getTheSelectedDaysInMonthByActiveDate());
    const { updateGoal } = useGoalContext();

    const handleSelectDayOnClick = (dateOfTheDay: Date) => {
        // if (!isItToday || selectedDay) return;
        //TODO
        // isYearAndMonthHasAlreadySelectedDayBefore
        // if not just push into selectedDaysInTheMonth
        // if exist keep other same push the day inside days and push
        const dateOfTheDayDateToTimestamp = dateToTimestamp(dateOfTheDay);
        const newObj = { date: dateOfTheDayDateToTimestamp, note: '' };
        updateGoal(
            {
                selectedDays: goalData.selectedDays
                    ? [...goalData.selectedDays, newObj]
                    : [newObj],
                totalSelectedDaysNumber: goalData.totalSelectedDaysNumber + 1,
            },
            goalData.goalId,
        );
    };

    // const isYearAndMonthHasAlreadySelectedDayBefore =
    //     goalData.selectedDaysInTheMonth.some(({ year }) =>
    //     );

    // const newSelectedDay = {year:activeYear,month:activeIndexOfMonth,days:[...goalData.selectedDaysInTheMonth,]}
    // updateGoal({selectedDaysInTheMonth:[...goalData.selectedDaysInTheMonth,]})
    // return setIsSelectedLocal(true);

    const arrayOfTheDayComponentsToProps =
        generateNumberArrayByNumberOfDaysInActiveMonth.map((day) => {
            const isSelected =
                isTheSelectedDayMatchWithTheDayInTheComponent(day);
            const dayDate = new Date(activeYear, activeIndexOfMonth, day);
            const handleClick = () => handleSelectDayOnClick(dayDate);
            const {
                isTheDateOnTheFuture,
                isTheDateOnThePast,
                isTheDatesAreExactSame,
            } = locationOfTheDateCompareToOtherDate(nowToDate, dayDate);
            return {
                isSelected,
                isTheDateOnTheFuture,
                isTheDateOnThePast,
                isTheDatesAreExactSame,
                day,
                handleClick,
            };
        });

    return (
        <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
        >
            <DaysCardContainer>
                <UnOrderedList>
                    {arrayOfTheDayComponentsToProps.map(
                        (
                            {
                                isSelected,
                                isTheDateOnTheFuture,
                                isTheDateOnThePast,
                                isTheDatesAreExactSame,
                                day,
                                handleClick,
                            },
                            index,
                        ) => (
                            <DayItem
                                key={index}
                                selectedDay={isSelected}
                                day={day}
                                isItToday={isTheDatesAreExactSame}
                                isOnThePast={isTheDateOnThePast}
                                isOnTheFuture={isTheDateOnTheFuture}
                                handleClick={handleClick}
                            />
                        ),
                    )}
                </UnOrderedList>
            </DaysCardContainer>
        </Grid>
    );
};
