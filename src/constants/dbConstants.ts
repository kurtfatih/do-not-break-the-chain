import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { auth } from '../database/firebase';
import { GoalDataI } from '../types/dbTypes';

export const getDefaultGoalData = (docId: string): GoalDataI => {
    return {
        user: auth.currentUser?.uid,
        createdAt: Timestamp.now(),
        goalId: docId,
        goalTexts: null,
        selectedDays: null,
        totalSelectedDaysNumber: 0,
    };
};
