import { goalType } from '../types/dbTypes';
import { todayMonth, todayYear } from './dateConstants';

export const defaultGoalData: goalType = {
    years: [todayYear],
    goalTexts: [],
    selectedDaysInTheMonth: [{ year: todayYear, month: todayMonth, days: [] }],
    totalSelectedDaysNumber: 0,
};
