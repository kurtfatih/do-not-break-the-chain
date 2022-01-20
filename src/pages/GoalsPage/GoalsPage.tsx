import React from 'react';

import { GoalDataI } from '../../types/dbTypes';
import { useGoalContext } from '../../context/GoalContext';
import GoalsPageContent from './GoalsPageContent';
import { useNavigate } from 'react-router-dom';
import { dateUtils } from '../../utils/dateUtils';

export const GoalsPage: React.FC = () => {
    const { getGoals, addNewGoal, deleteGoal } = useGoalContext();
    const navigate = useNavigate();
    const handleGoalClick = (goal: GoalDataI) => {
        const { goalId, createdAt, selectedDays } = goal;
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
    // const navigate = useNavigate();

    // navigate(
    //     `/goal/${goal.goalId}/${goal.years[goal.years.length - 1]}${
    //         goal.selectedDaysInTheMonth.length > 0
    //             ? '/' + goal.selectedDaysInTheMonth[0].month
    //             : ''
    //     }`,
    // ),
    const allGoals = getGoals;
    if (!allGoals) return null;

    return (
        <GoalsPageContent
            addNewGoal={addNewGoal}
            allGoals={allGoals}
            deleteGoal={deleteGoal}
            handleGoalClick={handleGoalClick}
        />
    );
};
export default GoalsPage;
