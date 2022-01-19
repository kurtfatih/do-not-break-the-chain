import { Grid } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Navigation } from '../components/Navigation';
import { backgroundColor } from '../constants/stylesConstants';
import { Routes } from './Routes';
import { WithDbContextProvider } from './WithWrappers';

export const Router: React.FC = () => {
    console.log('Router rendered ');
    return (
        <WithDbContextProvider>
            <BrowserRouter>
                <Grid sx={{ backgroundColor, height: '100%' }} container>
                    <Grid sx={{ backgroundColor }} item lg={10} container>
                        <Routes />
                    </Grid>
                    <Navigation />
                </Grid>
            </BrowserRouter>
        </WithDbContextProvider>
    );
};
