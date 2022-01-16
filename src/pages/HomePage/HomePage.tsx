import { Grid } from '@mui/material';
import React from 'react';

import { HomeBody } from './HomeBody';
import { HomeFooter } from './HomeFooter';
import { HomeHeader } from './HomeHeader';

export const HomePage: React.FC = () => {
    return (
        <Grid
            id="home-page-container"
            container
            item
            xs={12}
            flexDirection="column"
            justifyContent="space-between"
            sx={{
                padding: '10px',
                flexWrap: { lg: 'wrap', md: 'nowrap', xs: 'nowrap' },
                height: { lg: 'auto', md: '93%', xs: '93%' },
            }}
        >
            <HomeHeader />
            <HomeBody />
            <HomeFooter />
        </Grid>
    );
};
