
export function formatShort(amount) {
    if (!amount) return "Rp 0";
    const absAmount = Math.abs(amount);

    if (absAmount >= 1_000_000_000_000) {
        return "Rp " + (amount / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + " T";
    } else if (absAmount >= 1_000_000_000) {
        return "Rp " + (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " M";
    } else if (absAmount >= 1_000_000) {
        return "Rp " + (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + " JT";
    } else if (absAmount >= 1_000) {
        return "Rp " + (amount / 1_000).toFixed(1).replace(/\.0$/, "") + " RB";
    }
    return "Rp " + amount;
}

export function formatFull(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

