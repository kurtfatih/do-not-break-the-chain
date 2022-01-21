import { Grid } from '@mui/material';
import React from 'react';

import { GoalContent } from './GoalContent';
import { GoalHeader } from './GoalHeader';

export const GoalSections: React.FC = () => {
    return (
        <Grid container flexWrap="nowrap" flexDirection="column">
            <GoalHeader />
            <GoalContent />
        </Grid>
    );
};
