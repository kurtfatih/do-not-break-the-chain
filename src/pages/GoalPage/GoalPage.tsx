import React from 'react';
import { useParams } from 'react-router';

import { DateContextProvider } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { GoalSections } from './GoalSections';

const GoalPage: React.FC = () => {
    const { id } = useParams(); //goal id year month from router
    const { findAndGetGoalById } = useGoalContext();
    const goalData = findAndGetGoalById(id);
    if (!goalData) return null;

    return (
        <DateContextProvider goalData={goalData}>
            <GoalSections />
        </DateContextProvider>
    );
};
export default React.memo(GoalPage);
