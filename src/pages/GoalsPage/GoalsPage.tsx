import React from 'react';

import { useGoalContext } from '../../context/GoalContext';
import GoalsPageContent from './GoalsPageContent';

export const GoalsPage: React.FC = () => {
    const { getGoals, addNewGoal, deleteGoal } = useGoalContext();
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
        />
    );
};
export default GoalsPage;
