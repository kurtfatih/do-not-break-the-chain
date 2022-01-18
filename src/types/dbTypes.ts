import { Timestamp } from '@firebase/firestore';

export type selectedDaysDataType = {
    year: number;
    month: number;
    days: number[];
}[];

export type goalTextsObjType = {
    year: number;
    text: string;
};

export type goalTextsType = goalTextsObjType[];

export type goalType = {
    years: number[];
    goalTexts?: goalTextsType;
    selectedDaysInTheMonth: selectedDaysDataType;
    totalSelectedDaysNumber: number;
};
export type goalTypeUpdatableFieldType = Partial<goalType>;

export type goalsType = goalType[];

export type goalDataType = {
    user?: string;
    createdAt: Timestamp;
    goalId: string;
    years: number[];
    goalTexts?: goalTextsType;
    selectedDaysInTheMonth: selectedDaysDataType;
    totalSelectedDaysNumber: number;
};

export type ContactDataSetType = {
    email: string;
    name?: string | null;
    message: string;
};
