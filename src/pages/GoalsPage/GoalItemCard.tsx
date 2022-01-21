import { Button } from '@mui/material';
import { Card } from '../../components/Card';
import React from 'react';
import styled from 'styled-components';
import { SmallFont } from '../../components/Typography';

interface GoalsPageContentProps {
    deleteGoal: (goalId: string) => void;
    handleGoalClick: (goalId: string) => void;
    goalId: string;
    goalYear: number;
    goalText: string;
    missedDay: number;
    totalSelectedDays: number;
}

const GoalItemCard: React.FC<GoalsPageContentProps> = ({
    deleteGoal,
    handleGoalClick,
    goalId,
    goalYear,
    goalText,
    missedDay,
    totalSelectedDays,
}) => {
    return (
        <GoalItemContainer id="goal-item-container">
            <GoalItemMain
                id="goal-item-main"
                onClick={() => handleGoalClick(goalId)}
            >
                <Card
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        background: '#191E28',
                    }}
                    key={goalId}
                >
                    <SmallFont>Year:{goalYear}</SmallFont>
                    <SmallFont style={{ marginTop: '5px' }}>
                        Goal :{goalText}
                    </SmallFont>
                    <SmallFont>
                        Selected Days:
                        {totalSelectedDays}
                    </SmallFont>
                    <SmallFont>Missed Days: {missedDay}</SmallFont>
                </Card>
            </GoalItemMain>
            <Button
                variant="contained"
                color="warning"
                onClick={() => deleteGoal(goalId)}
            >
                Delete Goal
            </Button>
        </GoalItemContainer>
    );
};
export default React.memo(GoalItemCard);

const GoalItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform linear 0.1s;
    transform: scale(1);
    min-height: 220px;
    max-height: 220px;
    min-width: 150px;
    max-width: 150px;
    overflow-y: auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const GoalItemMain = styled.div`
    display: flex;
    flex-basis: 100%;
`;

{
    /* missed day calculatin
                                  current date -   document created date  - total selected days

                                */
}
