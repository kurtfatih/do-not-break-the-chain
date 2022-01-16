export const replaceObjInsideArrayWithExistOneByYear = <
    T extends { year: number },
>(
    arr: T[],
    newObj: T,
): T[] => {
    const newElements = arr.map((obj) => {
        const getIfGoalDataExist = obj.year === newObj.year;
        const newobj = getIfGoalDataExist ? newObj : obj;
        console.log('new obj', newobj);
        return newobj;
    });
    return newElements;
};
export const generateArrayFromNumber = (num: number) => {
    const arr = Array.from(Array(num).keys()).map((x) => x + 1);
    return arr;
};
