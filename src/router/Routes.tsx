import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { DbContextProvider } from '../context/DbContext';
import GoalPage from '../pages/AppPage/GoalPage';
import { ContactPage } from '../pages/ContactPage/ContactPage';
import GoalsPage from '../pages/GoalsPage/GoalsPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { NotFound404 } from '../pages/NotFound404';
import { WithGoalContextDbContextAndPrivateRoute } from './WithGoalContextDbContextAndPrivateRoute';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="*" element={<NotFound404 />} />
            <Route path="/" element={<HomePage />} />
            <Route
                path="/contact-us"
                element={
                    <DbContextProvider>
                        <ContactPage />
                    </DbContextProvider>
                }
            />
            <Route path="/goal/:id/:year">
                <Route
                    path=":month"
                    element={
                        <WithGoalContextDbContextAndPrivateRoute>
                            <GoalPage />
                        </WithGoalContextDbContextAndPrivateRoute>
                    }
                />
                <Route
                    path=""
                    element={
                        <WithGoalContextDbContextAndPrivateRoute>
                            <GoalPage />
                        </WithGoalContextDbContextAndPrivateRoute>
                    }
                />
            </Route>
            <Route
                path="/goals"
                element={
                    <WithGoalContextDbContextAndPrivateRoute>
                        <GoalsPage />
                    </WithGoalContextDbContextAndPrivateRoute>
                }
            />
            <Route path="/login" element={<LoginPage />} />
        </Switch>
    );
};
