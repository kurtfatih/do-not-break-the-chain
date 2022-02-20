import { Dialog, DialogProps, PaperProps } from '@mui/material';
import * as React from 'react';
import { Card } from './Card';

interface DialogPropsI {
    props: Omit<DialogProps, 'open'>;
    open: boolean;
    onClose: () => void;
    paperStyle: Partial<PaperProps<'div', Record<string, never>>> | undefined;
}
export const DialogComponent: React.FC<DialogPropsI> = ({
    children,
    open,
    paperStyle,
    onClose,
    ...props
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={paperStyle}
            {...props}
        >
            <Card style={{ height: '100%', display: 'flex' }}>{children}</Card>
        </Dialog>
    );
};
