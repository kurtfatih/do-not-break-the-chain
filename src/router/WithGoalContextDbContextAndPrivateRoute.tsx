import React from 'react';

import { DbContextProvider } from '../context/DbContext';
import { GoalContextProvider } from '../context/GoalContext';
import { PrivateRoute } from './PrivateRoute';

export const WithGoalContextDbContextAndPrivateRoute: React.FC = ({
    children,
}) => {
    return (
        <PrivateRoute>
            <DbContextProvider>
                <GoalContextProvider>{children}</GoalContextProvider>
            </DbContextProvider>
        </PrivateRoute>
    );
};
