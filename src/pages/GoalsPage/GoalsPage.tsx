import React from 'react';

import { useGoalContext } from '../../context/GoalContext';
import { useNavigate } from 'react-router-dom';
import { dateUtils } from '../../utils/dateUtils';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { AddRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { greenColor, breakPoints } from '../../constants/stylesConstants';
import { truncateString } from '../../utils/stringUtils';
import GoalItemCard from './GoalItemCard';

export const GoalsPage: React.FC = () => {
    const {
        getTheMissedDay,
        getGoals,
        findAndGetGoalById,
        addNewGoal,
        deleteGoal,
    } = useGoalContext();
    const navigate = useNavigate();
    const handleGoalClick = (goalId: string) => {
        const goal = findAndGetGoalById(goalId);
        if (!goal) return;
        const { createdAt, selectedDays } = goal;

        if (!createdAt) return;
        const createdAtTimestampToDate = createdAt.toDate();
        const { year } = dateUtils.parseTheDate(createdAtTimestampToDate);
        const selectedDayYearOrCreatedYear = selectedDays
            ? dateUtils.parseTheDate(
                  dateUtils.timestampToDate(
                      selectedDays[selectedDays.length - 1].date,
                  ),
              ).year
            : year;

        const selectedDayOrNull = selectedDays
            ? '/' +
              dateUtils.parseTheDate(
                  dateUtils.timestampToDate(
                      selectedDays[selectedDays.length - 1].date,
                  ),
              ).month
            : '';

        const link = `/goal/${goalId}/${selectedDayYearOrCreatedYear}${selectedDayOrNull}`;
        navigate(link);
    };

    const allGoals = getGoals;
    if (!allGoals) return null;

    return (
        <GoalsPageContainer>
            <GoalsContentsContainer id="goals-contents ">
                {allGoals.map(
                    ({ selectedDays, goalId, goalTexts, createdAt }) => (
                        <GoalItemCard
                            key={goalId}
                            deleteGoal={deleteGoal}
                            handleGoalClick={handleGoalClick}
                            goalId={goalId}
                            totalSelectedDays={
                                selectedDays ? selectedDays.length : 0
                            }
                            goalYear={
                                dateUtils.parseTheDate(
                                    dateUtils.timestampToDate(createdAt),
                                ).year
                            }
                            goalText={
                                goalTexts && goalTexts?.length > 0
                                    ? truncateString(goalTexts[0].text, 8)
                                    : ''
                            }
                            missedDay={getTheMissedDay(createdAt, selectedDays)}
                        />
                    ),
                )}
            </GoalsContentsContainer>
            <AddButtonContainer id="add-button-container">
                <IconButton
                    // variant="contained"
                    style={{
                        display: 'flex',
                        backgroundColor: '#00000050',
                        color: greenColor,
                    }}
                    color="success"
                    size="large"
                    onClick={addNewGoal}
                >
                    <AddRounded fontSize="large" />
                </IconButton>
            </AddButtonContainer>
        </GoalsPageContainer>
    );
};
export default GoalsPage;

const GoalsPageContainer = styled(Card)`
    display: flex;
    flex: 1;
    flex-flow: column wrap;
    gap: 20px;
    background: linear-gradient(
        156deg,
        rgba(41, 50, 65, 1) 0%,
        rgba(28, 34, 45, 1) 70%
    );
`;
const GoalsContentsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
`;

const AddButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    @media (max-width: ${breakPoints.lg}) {
        position: fixed;
        right: 5%;
        top: 5%;
    }
`;
