import { Timestamp } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';

import {
    breakPoints,
    greenColor,
    orangeColor,
} from '../../constants/stylesConstants';
import { SelectedDayDialog } from './SelectedDayDialog';

interface DayItemProps {
    day: number;
    dayTimestamp: Timestamp;
    selectedDay: boolean;
    isItToday: boolean;
    isOnTheFuture: boolean;
    isOnThePast: boolean;
    handleClick: () => void;
    selectedDayNote?: string;
}

const DayItem: React.FC<DayItemProps> = ({
    day,
    dayTimestamp,
    selectedDay,
    isItToday,
    isOnTheFuture,
    isOnThePast,
    handleClick,
    selectedDayNote,
}) => {
    // const [isSelectedLocal, setIsSelectedLocal] = React.useState(false);
    const [openSelectedDayDialog, setOpenSelectedDayDialog] =
        React.useState(false);
    const handleOpenSelectedDayDialog = () => {
        setOpenSelectedDayDialog(true);
    };
    const handleCloseSelectedDayDialog = () => {
        setOpenSelectedDayDialog(false);
    };
    return (
        <>
            <Day
                onClick={() => {
                    if (!isItToday && !selectedDay) return;
                    if (isItToday && selectedDay) {
                        return handleOpenSelectedDayDialog();
                    }
                    if (!isItToday && selectedDay) {
                        return handleOpenSelectedDayDialog();
                    }
                    if (isItToday && !selectedDay) {
                        handleClick();
                        // setIsSelectedLocal(true);
                        return;
                    }
                }}
                isSelected={selectedDay}
                isSelecTable={isItToday || selectedDay}
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
            <SelectedDayDialog
                handleCloseSelectedDayDialog={handleCloseSelectedDayDialog}
                openSelectedDayDialog={openSelectedDayDialog}
                selectedDayTimestamp={dayTimestamp}
                value={selectedDayNote}
            />
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
