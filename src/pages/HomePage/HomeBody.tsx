import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MouseCursor from '../../assets/mousecursor.png';
import { Image } from '../../components/Image';
import { SmallFont } from '../../components/Typography';
import { UnOrderedList } from '../../components/UnOrderedList';
import { todayDays } from '../../constants/dateConstant';
import { breakPoints } from '../../constants/stylesConstant';
import { generateArrayFromNumber } from '../../utils/arrUtils';
import { Day } from '../AppPage/DayItem';
import { DaysCardContainer } from '../AppPage/GoalContent';

// const HomeBodyContainer = styled.div`
//     display: flex;
//     flex: 4;
//     justify-content: center;
//     flex-wrap: wrap;
// `;
const days = generateArrayFromNumber(31);
const dummyDaysObj = days.map((day) => {
    console.log(day, todayDays);
    if (day === todayDays) {
        const obj = {
            isSelected: false,
            isSelecTable: true,
            isOnThePast: false,
            isOnTheFuture: false,
        };
        return obj;
    }
    if (day < todayDays) {
        return {
            isSelected: false,
            isSelecTable: false,
            isOnThePast: true,
            isOnTheFuture: false,
        };
    }
    if (day > todayDays) {
        return {
            isSelected: false,
            isSelecTable: false,
            isOnThePast: false,
            isOnTheFuture: true,
        };
    }
    return {
        isSelected: false,
        isSelecTable: false,
        isOnThePast: false,
        isOnTheFuture: false,
    };
});
const missedDays = todayDays - 1;

console.log(dummyDaysObj);

export const HomeBody: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Grid
            // sm="auto"
            id="home-body-container"
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <DaysCardContainer style={{}}>
                <UnOrderedList>
                    {dummyDaysObj.map(({ isSelecTable, ...props }, index) => {
                        return (
                            <Day
                                onClick={() => {
                                    if (!isSelecTable) return;
                                    navigate('/login');
                                }}
                                key={index}
                                isSelecTable={isSelecTable}
                                {...props}
                            >
                                {index + 1}
                            </Day>
                        );
                    })}
                </UnOrderedList>
            </DaysCardContainer>
            <SmallFont>
                <Image width="10" src={MouseCursor} /> 0 selected day{' '}
                {missedDays} missed day
            </SmallFont>
        </Grid>
    );
};
