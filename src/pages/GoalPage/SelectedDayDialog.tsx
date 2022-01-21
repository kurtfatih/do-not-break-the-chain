import { Dialog } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { Card } from '../../components/Card';
import { FormTextAreaInput } from '../../components/Form';
import { useDateContext } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { replaceObjInsideArrayWithExistOneByYear } from '../../utils/arrUtils';

interface SelectedDayDialogProps {
    openSelectedDayDialog: boolean;
    handleCloseSelectedDayDialog: () => void;
    value?: string;
    selectedDayTimestamp: Timestamp;
}

export const SelectedDayDialog: React.FC<SelectedDayDialogProps> = ({
    openSelectedDayDialog,
    handleCloseSelectedDayDialog,
    value,
    selectedDayTimestamp,
}) => {
    const currentValueRef = React.useRef('');
    const FormTextAreaInputRef = React.useRef<HTMLTextAreaElement>(null);
    const { updateGoal } = useGoalContext();
    const { goalData } = useDateContext();

    const [activeValue, setActiveValue] = React.useState<string>();

    const handleOnSelectedDayNoteChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setActiveValue(e.target.value);
        },
        [],
    );

    React.useEffect(() => {
        setActiveValue(value);
        currentValueRef.current = value ?? '';
    }, [value]);

    const handleOnBlur = () => {
        if (currentValueRef.current === activeValue || !activeValue) return;
        const newObj = {
            date: selectedDayTimestamp,
            note: activeValue,
        };

        if (goalData.selectedDays) {
            const res = replaceObjInsideArrayWithExistOneByYear(
                goalData.selectedDays,
                newObj,
            );

            return updateGoal(
                {
                    selectedDays: res,
                },
                goalData.goalId,
            );
        } else {
            return updateGoal(
                {
                    selectedDays: [newObj],
                },
                goalData.goalId,
            );
        }
    };
    return (
        <Dialog
            open={openSelectedDayDialog}
            onBlur={handleOnBlur}
            onClose={handleCloseSelectedDayDialog}
            PaperProps={{
                style: {
                    flexBasis: '25%',
                    backgroundColor: 'transparent',
                    height: '30%',
                },
            }}
        >
            <Card style={{ height: '100%', display: 'flex' }}>
                <FormTextAreaInput
                    value={activeValue}
                    style={{ width: '100%' }}
                    onChange={(e) => handleOnSelectedDayNoteChangeInput(e)}
                    ref={FormTextAreaInputRef}
                    placeholder="Type your selected day note here"
                />
            </Card>
        </Dialog>
    );
};
