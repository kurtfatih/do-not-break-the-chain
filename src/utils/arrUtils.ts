import { Timestamp } from '@firebase/firestore';

export const replaceObjInsideArrayWithExistOneByYear = <
    T extends { date: Timestamp },
>(
    arr: T[],
    newObj: T,
): T[] => {
    const indexOfSameOne = arr.findIndex(({ date }) =>
        date.isEqual(newObj.date),
    );
    let newGoalTextsCopy = [...arr];
    if (indexOfSameOne < 0) {
        newGoalTextsCopy = [...newGoalTextsCopy, newObj];
        //there is goal name before for active year
    } else {
        newGoalTextsCopy[indexOfSameOne] = newObj;
    }
    return newGoalTextsCopy;
};
export const generateArrayFromNumber = (num: number) => {
    const arr = Array.from(Array(num).keys()).map((x) => x + 1);
    return arr;
};
