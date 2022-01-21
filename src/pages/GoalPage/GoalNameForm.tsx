import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';

import { useDateContext } from '../../context/DateContext';
import { useGoalContext } from '../../context/GoalContext';
import { GoalText } from '../../types/dbTypes';
import {
    checkIsTimestampsAreEquals,
    dateToTimestamp,
} from '../../utils/dateUtils';

const GoalNameForm: React.FC = () => {
    const { activeDate, goalData, getTheGoalTextByActiveDate } =
        useDateContext();
    const goalNameInputRef = React.useRef('');
    const { updateGoal } = useGoalContext();
    const [activeGoalName, setActiveGoalName] = React.useState<
        string | undefined
    >();
    React.useEffect(() => {
        const goalName = getTheGoalTextByActiveDate();
        setActiveGoalName(goalName);
        goalNameInputRef.current = goalName ?? '';
    }, [getTheGoalTextByActiveDate, goalData.goalTexts]);
    const handleOnGoalNameChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setActiveGoalName(e.target.value);
        },
        [],
    );
    const handleGoalNameInputOnBlur = React.useCallback(() => {
        if (!activeGoalName || goalNameInputRef.current === activeGoalName)
            return;
        const newObj: GoalText = {
            date: dateToTimestamp(activeDate),
            text: activeGoalName,
        };

        if (goalData.goalTexts) {
            const indexOfSameOne = goalData.goalTexts.findIndex(({ date }) =>
                checkIsTimestampsAreEquals(date, newObj.date),
            );
            let newGoalTextsCopy = [...goalData.goalTexts];
            if (indexOfSameOne < 0) {
                newGoalTextsCopy = [...newGoalTextsCopy, newObj];
                //there is goal name before for active year
            } else {
                newGoalTextsCopy[indexOfSameOne] = newObj;
            }
            return updateGoal(
                {
                    goalTexts: newGoalTextsCopy,
                },
                goalData.goalId,
            );
        } else {
            return updateGoal(
                {
                    goalTexts: [newObj],
                },
                goalData.goalId,
            );
        }
        // const checkitOut: GoalTextsType = goalData.goalTexts
        //     ? replaceObjInsideArrayWithExistOneByYear(
        //           [...goalData.goalTexts, newObj],
        //           newObj,
        //       )
        //     : [newObj];
        // return updateGoal(
        //     {
        //         goalTexts: checkitOut,
        //     },
        //     goalData.goalId,
        // );
        // } else {
        // }
    }, [activeDate, activeGoalName, goalData, updateGoal]);
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
