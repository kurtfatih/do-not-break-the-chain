import { Grid } from '@mui/material';
import React from 'react';

// import { HeaderContainer } from '../../components/Layouts';
import GoalHeaderLeftSide from './GoalHeaderLeftSide';
import GoalHeaderRightSide from './GoalHeaderRightSide';

export const GoalHeader: React.FC = () => {
    return (
        <Grid container justifyContent="space-around">
            <GoalHeaderLeftSide />
            <GoalHeaderRightSide />
        </Grid>
    );
};
