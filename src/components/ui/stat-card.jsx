import {
    IconShoppingCart,
    IconCoin,
    IconSpeakerphone,
    IconWallet,
    IconArrowUp,
    IconArrowDown,
} from "@tabler/icons-react";

const iconMap = {
    cart: IconShoppingCart,
    coin: IconCoin,
    speaker: IconSpeakerphone,
    wallet: IconWallet,
};

const StatCard = ({
    title,
    value,
    percentage,
    trend = "up",
    since = "Seminggu lalu",
    icon = "cart",
    borderColor = "#3818D9",
}) => {
    const Icon = iconMap[icon];
    const isUp = trend === "up";

    return (
        <div
            className="w-full bg-foreground rounded-xl p-4 border-gray-200 border-1 overflow-hidden shadow-lg max-h-[150px]"
            style={{ borderBottom: `4px solid ${borderColor}` }}
        >
            <div className="flex items-center gap-2 justify-between">
                <p className="font-bold text-sm text-accent/60">{title}</p>
                <Icon
                    className="w-8 h-8 p-1 rounded-lg"
                    style={{
                        color: borderColor,
                        backgroundColor: `${borderColor}22`, // 13% opacity
                    }}
                />
            </div>
            <h2 className="font-bold py-5 text-2xl text-accent">{value}</h2>
            <div className="flex gap-2 text-xs">
                {percentage && isUp !== null && isUp !== undefined ? (
                    <>
                        {isUp ? (
                            <IconArrowUp width={16} height={16} className="text-green-500" />
                        ) : (
                            <IconArrowDown width={16} height={16} className="text-red-500" />
                        )}
                        <span
                            className={`font-bold pr-1 ${isUp ? "text-green-500" : "text-red-500"}`}
                        >
                            {isUp ? "+" : "-"}
                            {percentage}%
                        </span>
                    </>
                ) : null}

                <p>{since}</p>
            </div>

        </div>
    );
};

export default StatCard;
