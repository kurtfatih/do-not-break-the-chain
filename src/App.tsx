import React from 'react';

import { UserContextProvider } from './context/UserContext';
import { Router } from './router/Routers';

const App: React.FC = () => {
    return (
        <UserContextProvider>
            <Router />
        </UserContextProvider>
    );
};

export default App;
