import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { goalDataType } from '../../constants/dbconstant';
import { useGoalContext } from '../../context/GoalContext';
import GoalsPageContent from './GoalsPageContent';

export const GoalsPage: React.FC = () => {
    const { getGoals, addNewGoal, deleteGoal } = useGoalContext();
    const navigate = useNavigate();
    const navigateToGoalPageByGoal = useCallback(
        (goal: goalDataType) =>
            navigate(
                `/goal/${goal.goalId}/${goal.years[goal.years.length - 1]}${
                    goal.selectedDaysInTheMonth.length > 0
                        ? '/' + goal.selectedDaysInTheMonth[0].month
                        : ''
                }`,
            ),
        [navigate],
    );
    const allGoals = getGoals();
    if (!allGoals) return null;

    return (
        <GoalsPageContent
            addNewGoal={addNewGoal}
            allGoals={allGoals}
            deleteGoal={deleteGoal}
            navigateToGoalPage={navigateToGoalPageByGoal}
        />
    );
};
export default GoalsPage;
