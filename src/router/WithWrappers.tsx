import React from 'react';

import { DbContextProvider } from '../context/DbContext';
import { GoalContextProvider } from '../context/GoalContext';
import { PrivateRoute } from './PrivateRoute';

export const WithPrivateRoute: React.FC = ({ children }) => {
    return <PrivateRoute>{children}</PrivateRoute>;
};
export const WithDbContextProvider: React.FC = ({ children }) => {
    return <DbContextProvider>{children}</DbContextProvider>;
};
export const WithGoalContextProvider: React.FC = ({ children }) => {
    return <GoalContextProvider>{children}</GoalContextProvider>;
};
