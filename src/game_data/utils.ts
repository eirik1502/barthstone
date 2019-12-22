

export const range = (size: number, startAt: number = 0): number[] => {
    const zeroRange = Array.from(Array(size).keys())
    return [...zeroRange].map(i => i + startAt);
}