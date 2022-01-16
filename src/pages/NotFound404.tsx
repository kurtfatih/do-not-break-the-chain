import Typography from '@mui/material/Typography';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const NotFound404: React.FC = () => {
    const { pathname } = useLocation();
    const pathValue = pathname.substring(1);
    return (
        <Typography color="#fff" variant="h1" mt={2}>
            404 Not Found: {pathValue.toLowerCase()}
        </Typography>
    );
};
