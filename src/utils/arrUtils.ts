import { Timestamp } from '@firebase/firestore';

export const replaceObjInsideArrayWithExistOneByYear = <
    T extends { date: Timestamp },
>(
    arr: T[],
    newObj: T,
): T[] => {
    const newElements = arr.map((obj) => {
        console.log(obj.date.isEqual(newObj.date));
        const getIfGoalDataExist = obj.date.isEqual(newObj.date);
        const newobj = getIfGoalDataExist ? newObj : obj;
        return newobj;
    });
    console.log('durr', newElements);
    return newElements;
};
export const generateArrayFromNumber = (num: number) => {
    const arr = Array.from(Array(num).keys()).map((x) => x + 1);
    return arr;
};
