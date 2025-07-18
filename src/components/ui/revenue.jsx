import { IconChartBar, IconCoin, IconShoppingCartFilled, IconSparkles} from '@tabler/icons-react';
import React from 'react';

  const getIcon = (title) => {
  const key = title.toLowerCase();

  if (key.includes("omset")) return <IconCoin height={19} />;
  if (key.includes("komisi")) return <IconShoppingCartFilled height={19} />;
  if (key.includes("hasil") || key.includes("live")) return <IconChartBar height={19} />;

  return null; // fallback bisa tambahkan icon default
};
const RevenueCard = ({color, data}) => {
    if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className={`bg-${color.bg} text-${color.text} rounded-3xl p-6 shadow-xl w-full`}>
      <div className="text-center">
        <p className="text-xl font-bold mb-6">Total</p>

      <div className="flex justify-center gap-8 md:gap-12">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className={`w-px bg-${color.text} self-stretch`}></div>

            <div className="text-center">
              <div className="flex justify-center gap-1">
                {getIcon(item.title)}
                <p className="text-sm opacity-90 mb-2">{item.title}</p>
              </div>
              <p className="text-2xl font-bold">Rp. {item.data}</p>
            </div>
          </React.Fragment>
        ))}
        <div className={`w-px bg-${color.text} self-stretch`}></div>
      </div>
      </div>
    </div>
  );
};

export default RevenueCard;