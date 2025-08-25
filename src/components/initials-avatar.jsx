import React, { useMemo } from "react";

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++)
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
}

export default function InitialsAvatarCard({
    name = "Nala Porsche",
    studio = "Studio 1",
    size = 80,
}) {


    const initials = useMemo(
        () =>
            name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
        [name]
    );

    const bg = stringToColor(name);

    const InitialsCircle = () => (
        <div
            className="flex items-center justify-center rounded-full text-white font-bold select-none"
            style={{
                width: size,
                height: size,
                fontSize: size / 2.8,
                backgroundColor: bg,
            }}
        >
            {initials}
        </div>
    );

    return (
        <div className="relative w-72">
            {/* Card utama */}
            <div className="bg-green-800 rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg relative z-10 h-72 w-full">
                {/* Avatar initials */}
                <div
                    className="flex items-center justify-center rounded-full text-white font-bold select-none"
                    style={{
                        width: 100,
                        height: 100,
                        fontSize: 100 / 2.5, // otomatis menyesuaikan font
                        backgroundColor: bg,
                    }}
                >
                    {initials}
                </div>

                {/* Name & Studio */}
                <h3 className="text-white font-bold p-2">{name}</h3>
                {studio && <p className="text-white/80">{studio}</p>}
            </div>

            {/* Lapisan Tumpukan */}
            <div className="absolute left-5 -bottom-3 h-[90%] w-[85%] bg-green-500 rounded-2xl z-[1]"></div>
            <div className="absolute left-10 -bottom-6 h-[80%] w-[70%] bg-primary rounded-2xl z-0"></div>
        </div>

    );

}
