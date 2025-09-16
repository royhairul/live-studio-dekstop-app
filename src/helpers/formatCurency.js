import React from "react";

function formatShort(amount) {
    if (!amount) return "Rp 0";

    const absAmount = Math.abs(amount);
    let formatted = "";

    if (absAmount >= 1_000_000_000_000) {
        formatted = (amount / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + " T";
    } else if (absAmount >= 1_000_000_000) {
        formatted = (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " M";
    } else if (absAmount >= 1_000_000) {
        formatted = (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + " Jt";
    } else if (absAmount >= 1_000) {
        formatted = (amount / 1_000).toFixed(1).replace(/\.0$/, "") + " Rb";
    } else {
        formatted = amount.toString();
    }

    return "Rp " + formatted;
}

function formatFull(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function IDRHover({ amount }) {
    return (
        <span title={formatFull(amount)}>
            {formatShort(amount)}
        </span>
    );
}
