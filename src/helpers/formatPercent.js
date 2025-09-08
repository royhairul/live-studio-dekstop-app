export function formatPercentage(value) {
    if (value === null || value === undefined) return "0%";
    return `${value.toFixed(2)}%`;
}

export function getPercentageACOS(value) {
    if (value < 3) {
        return "bg-green-100 text-green-700 px-2 py-1 rounded";
    }
    return "bg-red-100 text-red-700 px-2 py-1 rounded";
}