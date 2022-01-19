import React from 'react';
import styled from 'styled-components';

import {
    breakPoints,
    greenColor,
    orangeColor,
} from '../../constants/stylesConstants';

interface DayItemProps {
    day: number;
    selectedDay?: boolean;
    isItToday: boolean;
    isOnTheFuture: boolean;
    isOnThePast: boolean;
    handleClick: () => void;
}

const DayItem: React.FC<DayItemProps> = ({
    day,
    selectedDay,
    isItToday,
    isOnTheFuture,
    isOnThePast,
    handleClick,
}) => {
    const [isSelectedLocal, setIsSelectedLocal] = React.useState(false);
    return (
        <>
            <Day
                onClick={() => {
                    if (!isItToday || selectedDay) return;
                    handleClick();
                    setIsSelectedLocal(true);
                }}
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
