import { CircularProgress, Dialog } from '@mui/material';
import React from 'react';

import { greenColor } from '../constants/stylesConstant';

export const Loading: React.FC = () => {
    return (
        <Dialog
            PaperProps={{
                style: { backgroundColor: 'transparent', boxShadow: 'unset' },
            }}
            open={true}
        >
            <CircularProgress
                thickness={20}
                value={100}
                style={{ color: greenColor, backgroundColor: 'transparent' }}
            />
        </Dialog>
    );
};
