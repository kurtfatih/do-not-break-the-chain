import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import GoalPage from '../pages/AppPage/GoalPage';
import { ContactPage } from '../pages/ContactPage/ContactPage';
import GoalsPage from '../pages/GoalsPage/GoalsPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { NotFound404 } from '../pages/NotFound404';
import { WithGoalContextProvider, WithPrivateRoute } from './WithWrappers';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="*" element={<NotFound404 />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/goal/:id/:year">
                <Route
                    path=":month"
                    element={
                        <WithPrivateRoute>
                            <WithGoalContextProvider>
                                <GoalPage />
                            </WithGoalContextProvider>
                        </WithPrivateRoute>
                    }
                />
                <Route
                    path=""
                    element={
                        <WithPrivateRoute>
                            <WithGoalContextProvider>
                                <GoalPage />
                            </WithGoalContextProvider>
                        </WithPrivateRoute>
                    }
                />
            </Route>
            <Route
                path="/goals"
                element={
                    <WithPrivateRoute>
                        <WithGoalContextProvider>
                            <GoalsPage />
                        </WithGoalContextProvider>
                    </WithPrivateRoute>
                }
            />
            <Route path="/login" element={<LoginPage />} />
        </Switch>
    );
};
