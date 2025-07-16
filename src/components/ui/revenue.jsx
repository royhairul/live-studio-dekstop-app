import { IconCoin, IconShoppingCartFilled, IconSparkles} from '@tabler/icons-react';
import React from 'react';

const RevenueCard = () => {
  return (
    <div className="bg-primary rounded-3xl text-white p-6 shadow-xl">
      <div className="text-center">
        <div className="flex gap-2 justify-center">
        <IconSparkles/>
        <p className="text-xl font-bold mb-6">Total Pendapatan Live</p>
        </div>
        
        <div className="flex justify-center gap-8 md:gap-12">
          <div className="w-px bg-white/20 self-stretch"></div>

          <div className="text-center">
            <div className="flex justify-center gap-1">
            <IconCoin height={19}/>
            <p className="text-sm opacity-90 mb-2">Total Omset / Jam</p>
            </div>
            <p className="text-2xl font-bold">10 Juta</p>
          </div>
          
          <div className="w-px bg-white/20 self-stretch"></div>
          
          <div className="text-center">
            <div className="flex justify-center gap-1">
            <IconShoppingCartFilled height={19}/>
            <p className="text-sm opacity-90 mb-2">Total Hasil Komisi</p>
            </div>
            <p className="text-2xl font-bold">1.2K</p>
          </div>
          <div className="w-px bg-white/25 self-stretch"></div>

        </div>
        
        <div className="mt-4 text-xs opacity-75">
          Data diperbarui setiap 5 menit
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;