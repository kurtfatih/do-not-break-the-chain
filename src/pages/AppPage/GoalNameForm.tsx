import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';

import { useDateContext } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { replaceObjInsideArrayWithExistOneByYear } from '../../utils/arrUtils';

const GoalNameForm: React.FC = () => {
    const { activeYear, goalData } = useDateContext();
    const goalNameInputRef = React.useRef('');
    const { getTheGoalTextByActiveYear, updateGoal } = useGoalContext();
    const [activeGoalName, setActiveGoalName] = React.useState<
        string | undefined
    >();
    React.useEffect(() => {
        const goalName = getTheGoalTextByActiveYear(
            activeYear,
            goalData.goalTexts,
        );
        setActiveGoalName(goalName);
        goalNameInputRef.current = goalName ?? '';
    }, [activeYear, getTheGoalTextByActiveYear, goalData.goalTexts]);
    const handleOnGoalNameChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setActiveGoalName(e.target.value);
        },
        [],
    );
    const handleGoalNameInputOnBlur = React.useCallback(() => {
        if (!activeGoalName || goalNameInputRef.current === activeGoalName)
            return;
        if (!goalData.goalTexts) return;
        const isYearHasGoalNameAlready = getTheGoalTextByActiveYear(
            activeYear,
            goalData.goalTexts,
        );

        if (isYearHasGoalNameAlready) {
            const newObj = {
                year: activeYear,
                text: activeGoalName,
            };
            const newElement = replaceObjInsideArrayWithExistOneByYear(
                goalData.goalTexts,
                newObj,
            );
            updateGoal(
                {
                    goalTexts: newElement,
                },
                goalData,
            );
        } else {
            updateGoal(
                {
                    goalTexts: [
                        ...goalData.goalTexts,
                        { year: activeYear, text: activeGoalName },
                    ],
                },
                goalData,
            );
        }
    }, [
        activeGoalName,
        activeYear,
        getTheGoalTextByActiveYear,
        goalData,
        updateGoal,
    ]);
    return (
        <FormControl variant="standard">
            <InputLabel
                style={{ color: 'white' }}
                htmlFor="component-filled"
                focused={activeGoalName ? true : false}
                shrink={true}
            >
                Goal Name
            </InputLabel>
            <Input
                inputProps={{ style: { color: 'white' } }}
                id="component-filled"
                onBlur={handleGoalNameInputOnBlur}
                value={activeGoalName ?? ''}
                placeholder="Type goal name here..."
                onChange={(e) => handleOnGoalNameChangeInput(e)}
            />
        </FormControl>
    );
};
export default GoalNameForm;
