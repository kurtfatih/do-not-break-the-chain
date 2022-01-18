import { Dialog } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import DateSvg from '../../assets/date.svg';
import { Card, CardInsideContainer } from '../../components/Card';
import { Image } from '../../components/Image';
import { LargeFont, SmallFont } from '../../components/Typography';
import { UnOrderedList } from '../../components/UnOrderedList';
import { months } from '../../constants/dateConstants';
import { breakPoints, greenColor } from '../../constants/stylesConstants';
import { useDateContext } from '../../context/DateContext';

const GoalHeaderRightSide: React.FC = () => {
    const [openMonthDialog, setOpenMonthDialog] = React.useState(false);

    const handleOpenMonthDialog = React.useCallback(() => {
        setOpenMonthDialog(!openMonthDialog);
    }, [openMonthDialog]);
    const { activeMonthName, changeMonth } = useDateContext();

    return (
        <HeaderRightSideContainer>
            <div onClick={handleOpenMonthDialog}>
                <HeaderRightSideCardContainer>
                    <CardInsideContainer>
                        <Line />
                        <MonthContainer>
                            <Image
                                src={DateSvg}
                                alt="date"
                                width={60}
                                height={60}
                            />

                            <MonthNameText upperCase bolder>
                                {activeMonthName}
                            </MonthNameText>
                        </MonthContainer>
                    </CardInsideContainer>
                </HeaderRightSideCardContainer>
            </div>
            <Dialog
                PaperComponent={Card}
                open={openMonthDialog}
                onClose={handleOpenMonthDialog}
            >
                <div style={{ display: 'flex' }}>
                    <UnOrderedList>
                        {months.map((month, index) => (
                            <Month
                                onClick={() => changeMonth(index)}
                                key={index}
                            >
                                <SmallFont key={index}>{month}</SmallFont>
                            </Month>
                        ))}
                    </UnOrderedList>
                </div>
            </Dialog>
        </HeaderRightSideContainer>
    );
};
export default React.memo(GoalHeaderRightSide);
const HeaderRightSideContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    /* @media (max-width: ${breakPoints.md}) {
        display: block;
        width: 100%;
        flex-basis: 100%;
    } */
`;
const HeaderRightSideCardContainer = styled(Card)`
    display: flex;
    cursor: pointer;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: ${breakPoints.md}) {
        border-radius: 0 0 10px 10px;
        /* box-shadow: unset; */
    }
`;
const Line = styled.span`
    display: block;
    width: 100%;
    border-top: 5px solid white;
    position: relative;
    bottom: -3px;
    border-radius: 10px;
`;
const MonthContainer = styled.div`
    display: flex;
    @media (max-width: ${breakPoints.lg}) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;
const Month = styled.li`
    color: #fff;
    background-color: gray;
    padding: 20px 10px 20px 10px;
    border-radius: 10px;
    min-width: 50px;
    cursor: pointer;
    &:hover {
        background-color: ${greenColor};
    }
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;
const MonthNameText = styled(LargeFont)`
    @media (max-width: ${breakPoints.md}) {
        font-size: 45px;
    }
`;
