import { Timestamp } from '@firebase/firestore';
import React, { createContext, useContext } from 'react';

import { nowToDate } from '../constants/dateConstants';
import {
    GoalDataI,
    GoalsDataType,
    GoalTextsType,
    GoalTypeUpdatableFieldType,
    SelectedDaysType,
} from '../types/dbTypes';
import {
    dateDiffInDays,
    parseTheDate,
    timestampToDate,
} from '../utils/dateUtils';
import { useDbContext } from './DbContext';

interface GoalContextI {
    getGoals: () => GoalsDataType | undefined;
    findTheGoal: (id: string) => boolean | undefined;
    isGoalExist: (id: string) => boolean;
    findAndGetGoalById: (id?: string | undefined) => GoalDataI | undefined;
    goalData: GoalDataI | undefined;
    setGoalData: React.Dispatch<React.SetStateAction<GoalDataI | undefined>>;
    addNewGoal: () => void;
    // changeOnGoalText: (e: string) => void;
    deleteGoal: (goalId: string) => void;
    updateGoal: (
        fieldsToUpdate: GoalTypeUpdatableFieldType,
        goalId: string,
    ) => void;
    getTheMissedDay: (goalCreatedAt: Date, totalSelectedDays: number) => number;
}

const GoalContext = createContext<GoalContextI | null>(null);

export function useGoalContext() {
    const context = useContext(GoalContext);
    if (!context) {
        throw new Error(
            'use GoalContext provider must be used within the GoalContext.Provider',
        );
    }
    return context;
}

export const GoalContextProvider: React.FC = ({ children }) => {
    const { updateGoalOnDb, createNewGoalOnDb, goalsData, deleteGoalOnDb } =
        useDbContext();
    const [goalData, setGoalData] = React.useState<GoalDataI>();

    const getGoals = React.useCallback(() => {
        if (!goalsData) return;
        console.log('getgoalsfc', goalsData);
        return goalsData;
    }, [goalsData]);
    // update the goal

    const findTheGoal = (id: string) => {
        if (!goalsData) return false;
        const res = goalsData.some((goal) => goal.goalId === id);
        return res;
    };

    const isGoalExist = (id: string) => {
        const isExist = findTheGoal(id);
        return isExist;
    };

    const findAndGetGoalById = React.useCallback(
        (id?: string) => {
            const goal = goalsData?.filter((goal) => goal.goalId === id);
            if (!goal) return;
            return goal[0];
        },
        [goalsData],
    );

    const addNewGoal = React.useCallback(() => {
        if (!goalsData || goalsData.length > 11) return;
        createNewGoalOnDb();
    }, [createNewGoalOnDb, goalsData]);

    const deleteGoal = React.useCallback(
        (goalId: string) => deleteGoalOnDb(goalId),
        [deleteGoalOnDb],
    );

    const updateGoal = (
        fieldsToUpdate: GoalTypeUpdatableFieldType,
        goalId: string,
    ) => {
        const obj: GoalTypeUpdatableFieldType = { ...fieldsToUpdate };
        updateGoalOnDb(goalId, obj);
    };
    const getTheMissedDay = React.useCallback(
        (goalCreatedAt: Date, totalSelectedDays: number) => {
            const diffDays = dateDiffInDays(nowToDate, goalCreatedAt);
            const missedDayCalculation = diffDays - totalSelectedDays;
            const missedDay =
                missedDayCalculation < 0 ? 0 : missedDayCalculation;
            return missedDay;
            {
                /* missed day calculatin
                                  current date -   document created date  - total selected days

                                */
            }
        },
        [],
    );
    //update goal
    return (
        <GoalContext.Provider
            value={{
                getGoals,
                goalData,
                findTheGoal,
                isGoalExist,
                findAndGetGoalById,
                setGoalData,
                addNewGoal,
                updateGoal,
                getTheMissedDay,
                // changeOnGoalText,
                deleteGoal,
            }}
        >
            {children}
        </GoalContext.Provider>
    );
};
