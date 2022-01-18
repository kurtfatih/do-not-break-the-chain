import { Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { Card } from '../../components/Card';
// import { ContentBody } from '../../components/Layouts';
import { UnOrderedList } from '../../components/UnOrderedList';
import { todayDate } from '../../constants/dateConstant';
import { breakPoints } from '../../constants/stylesConstant';
import { useDateContext } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { locationOfTheDateCompareToOtherDate } from '../../utils/dateUtils';
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
    } = useDateContext();

    const { updateGoal, getTheSelectedDaysInTheMonthViaYear } =
        useGoalContext();

    const arrayOfTheDayComponentsToProps =
        generateNumberArrayByNumberOfDaysInActiveMonth.map((day) => {
            const isSelected =
                isTheSelectedDayMatchWithTheDayInTheComponent(day);
            const activeDate = new Date(activeYear, activeIndexOfMonth, day);
            const {
                isTheDateOnTheFuture,
                isTheDateOnThePast,
                isTheDatesAreExactSame,
            } = locationOfTheDateCompareToOtherDate(todayDate, activeDate);
            return {
                isSelected,
                isTheDateOnTheFuture,
                isTheDateOnThePast,
                isTheDatesAreExactSame,
                day,
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
                                activeIndexOfMonth={activeIndexOfMonth}
                                activeYear={activeYear}
                                getTheSelectedDaysInTheMonthViaYear={
                                    getTheSelectedDaysInTheMonthViaYear
                                }
                                goalData={goalData}
                                updateGoal={updateGoal}
                            />
                        ),
                    )}
                </UnOrderedList>
            </DaysCardContainer>
        </Grid>
    );
};
