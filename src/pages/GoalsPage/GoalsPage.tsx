import React from 'react';

import { GoalDataI } from '../../types/dbTypes';
import { useGoalContext } from '../../context/GoalContext';
import GoalsPageContent from './GoalsPageContent';
import { useNavigateTo } from '../../hooks/useNavigateTo';
import { parseTheDate, timestampToDate } from '../../utils/dateUtils';

export const GoalsPage: React.FC = () => {
    const { getGoals, addNewGoal, deleteGoal } = useGoalContext();

    const { goTo } = useNavigateTo();
    const handleGoalClick = (goal: GoalDataI) => {
        const { goalId, createdAt, selectedDays } = goal;
        if (!createdAt) return;
        const createdAtTimestampToDate = createdAt.toDate();
        const { year } = parseTheDate(createdAtTimestampToDate);
        const selectedDayYearOrCreatedYear = selectedDays
            ? parseTheDate(
                  timestampToDate(selectedDays[selectedDays.length - 1].date),
              ).year
            : year;

        const selectedDayOrNull = selectedDays
            ? '/' +
              parseTheDate(
                  timestampToDate(selectedDays[selectedDays.length - 1].date),
              ).month
            : '';

        const link = `/goal/${goalId}/${selectedDayYearOrCreatedYear}${selectedDayOrNull}`;
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
    console.log(allGoals);
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
