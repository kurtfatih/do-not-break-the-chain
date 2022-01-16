export const truncateString = (str: string, to: number) => {
    const truncatedString = str.substring(0, to) + '...';
    return truncatedString;
};
