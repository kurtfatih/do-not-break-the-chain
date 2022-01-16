import React, { createContext, useContext } from 'react';

import { todayDate } from '../constants/dateConstant';
import {
    goalDataType,
    goalTextsType,
    goalType,
    goalTypeUpdatableFieldType,
    selectedDaysDataType,
} from '../constants/dbconstant';
import { dateDiffInDays } from '../utils/dateUtils';
import { useDbContext } from './DbContext';

interface GoalContextI {
    getGoals: () => goalDataType[] | undefined;
    findTheGoal: (id: string) => boolean | undefined;
    isGoalExist: (id: string) => boolean;
    findAndGetGoalById: (id?: string | undefined) => goalDataType | undefined;
    goalData: goalType | undefined;
    setGoalData: React.Dispatch<React.SetStateAction<goalType | undefined>>;
    getTheGoalTextByActiveYear: (
        activeYear: number,
        goalTexts?: goalTextsType,
    ) => string | undefined;
    getTheSelectedDaysInTheMonthViaYear: (
        activeYear: number,
        selectedDaysInTheMonth: selectedDaysDataType,
    ) => number[] | undefined;
    addNewGoal: () => void;
    // changeOnGoalText: (e: string) => void;
    deleteGoal: (goalId: string) => void;
    updateGoal: (
        fieldsToUpdate: goalTypeUpdatableFieldType,
        activeGoalData: goalDataType,
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
    const [goalData, setGoalData] = React.useState<goalType>();

    const getGoals = React.useCallback(() => {
        if (!goalsData) return;
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

    const getTheGoalTextByActiveYear = (
        activeYear: number,
        goalTexts?: goalTextsType,
    ) => {
        if (goalTexts?.length === 0 || !goalTexts) return;
        const goalTextObj = goalTexts.filter(({ year }) => year === activeYear);
        if (goalTextObj.length === 0) return;
        // console.log(activeYear, goalTexts);
        const goalText = goalTextObj[goalTextObj.length - 1].text;
        return goalText;
    };

    const getTheSelectedDaysInTheMonthViaYear = React.useCallback(
        (activeYear: number, selectedDaysInTheMonth: selectedDaysDataType) => {
            const activeYearObj = selectedDaysInTheMonth.filter(
                ({ year }) => year === activeYear,
            );
            if (activeYearObj.length === 0) return;
            const days = activeYearObj[activeYearObj.length - 1].days;
            return days;
        },
        [],
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
        fieldsToUpdate: goalTypeUpdatableFieldType,
        activeGoalData: goalDataType,
    ) => {
        const { goalId } = activeGoalData;
        const obj: goalTypeUpdatableFieldType = { ...fieldsToUpdate };
        updateGoalOnDb(goalId, obj);
    };
    const getTheMissedDay = React.useCallback(
        (goalCreatedAt: Date, totalSelectedDays: number) => {
            const diffDays = dateDiffInDays(todayDate, goalCreatedAt);
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
                getTheGoalTextByActiveYear,
                getTheSelectedDaysInTheMonthViaYear,
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
