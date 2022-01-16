import React from 'react';
import { Navigate } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { useUserContext } from '../context/UserContext';

export const PrivateRoute: React.FC = ({ children }) => {
    const { isUserLoggedIn, isUserLoading } = useUserContext();
    if (isUserLoading) return <Loading />;
    if (isUserLoggedIn()) return <>{children}</>;
    return <Navigate to="/login" />;
};
