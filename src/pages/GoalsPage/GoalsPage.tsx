import React from 'react';

import { goalDataType } from '../../types/dbTypes';
import { useGoalContext } from '../../context/GoalContext';
import GoalsPageContent from './GoalsPageContent';
import { useNavigateTo } from '../../hooks/useNavigateTo';

export const GoalsPage: React.FC = () => {
    const { getGoals, addNewGoal, deleteGoal } = useGoalContext();

    const { goTo } = useNavigateTo();
    const handleGoalClick = (goal: goalDataType) => {
        const { goalId, years, selectedDaysInTheMonth } = goal;
        const link = `/goal/${goalId}/${years[years.length - 1]}${
            selectedDaysInTheMonth.length > 0
                ? '/' + selectedDaysInTheMonth[0].month
                : ''
        }`;
        goTo(link);
    };
    // const navigate = useNavigate();

    // navigate(
    //     `/goal/${goal.goalId}/${goal.years[goal.years.length - 1]}${
    //         goal.selectedDaysInTheMonth.length > 0
    //             ? '/' + goal.selectedDaysInTheMonth[0].month
    //             : ''
    //     }`,
    // ),
    const allGoals = getGoals();
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
