export function formatPercentage(value) {
    if (value === null || value === undefined) return "0%";

    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value) + "%";
}

export function getPercentageACOS(value) {
    if (value < 3) {
        return "bg-green-100 text-green-700 px-2 py-1 rounded";
    }
    return "bg-red-100 text-red-700 px-2 py-1 rounded";
}

export function getPercentageROAS(value) {
    if (value < 40) {
        return "bg-red-100 text-red-700 px-2 py-1 rounded";
    }
    return "bg-green-100 text-green-700 px-2 py-1 rounded";
}


export function getPercentageTarget(value) {
    if (value === null || value === undefined) {
        return "bg-gray-100 text-gray-700 px-2 py-1 rounded";
    }

    if (value >= 50) {
        return "bg-red-100 text-red-700 px-2 py-1 rounded";
    } else if (value >= 80) {
        return "bg-blue-100 text-blue-700 px-2 py-1 rounded";
    } else {
        return "bg-green-100 text-green-700 px-2 py-1 rounded";
    }
}

export function getPercentageRealisasi(value) {
    if (value === null || value === undefined) {
        return "bg-gray-100 text-gray-700 px-2 py-1 rounded";
    }

    if (value <= 50) {
        return "bg-red-100 text-red-700 px-2 py-1 rounded";   
    } else if (value <= 80) {
        return "bg-blue-100 text-blue-700 px-2 py-1 rounded"; 
    } else {
        return "bg-green-100 text-green-700 px-2 py-1 rounded"; 
    }
}
