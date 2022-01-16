import React from 'react';
import { useParams } from 'react-router';

import { DateContextProvider } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { GoalSections } from './GoalSections';

const GoalPage: React.FC = () => {
    const { id, year, month } = useParams(); //goal id year month from router
    const goalYearParamToNumber = Number(year); // convert year string to num
    const goalMonthParamToNumber = Number(month); // convert month string to num
    const { findAndGetGoalById } = useGoalContext();
    const goalData = findAndGetGoalById(id);
    if (!goalData) return null;

    return (
        <DateContextProvider
            goalYear={goalYearParamToNumber}
            goalMonth={goalMonthParamToNumber}
            goalData={goalData}
        >
            <GoalSections />
        </DateContextProvider>
    );
};
export default React.memo(GoalPage);
