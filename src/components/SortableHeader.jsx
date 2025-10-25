import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import React from "react";

export default function SortableHeader({ column, title, align = "left", className = "" }) {
    const isSorted = column.getIsSorted();

    return (
        <div
            className={`flex items-center gap-1 cursor-pointer select-none ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : ""
                } ${className}`}
            onClick={() => column.toggleSorting(isSorted === "asc")}
        >
            <span className="font-semibold">{title}</span>
            {isSorted === "asc" ? (
                <IconArrowUp size={14} />
            ) : isSorted === "desc" ? (
                <IconArrowDown size={14} />
            ) : (
                <IconArrowDown size={14} className="opacity-30" />
            )}
        </div>
    );
}
