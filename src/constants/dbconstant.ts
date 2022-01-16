import { Timestamp } from '@firebase/firestore';

import { todayMonth, todayYear } from './dateConstant';

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

export const defaultGoalData: goalType = {
    years: [todayYear],
    goalTexts: [],
    selectedDaysInTheMonth: [{ year: todayYear, month: todayMonth, days: [] }],
    totalSelectedDaysNumber: 0,
};
// const daysv2 = dummyConstantData.goals.map((goalObj) =>
//   goalObj.monthanddays.find(({ year }) => year === 2022)
// )
// console.log("daysv2", daysv2)
// years: [2022, 2021],
// goalTexts: [
//   { year: 2022, text: "" },
//   { year: 2021, text: "" }
// ],
// monthanddays: [
//   { year: 2022, month: 0, days: [1, 2, 3] },
//   { year: 2022, month: 1, days: [1, 2, 3, 4, 5] },
//   { year: 2021, month: 0, days: [1, 2, 3] },
//   { year: 2021, month: 1, days: [1, 2, 3, 4, 5] }
// ]
