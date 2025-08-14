import MainLayout from "@/layouts/main-layout";
import { IconBarrierBlock, IconChartLine, IconShoppingBag } from "@tabler/icons-react";

export default function AccountPerformPage() {
  const breadcrumbs = [
    {
      icon: IconChartLine,
      label: "Performa",
      url: "/perform/account",
    },
    {
      label: "Akun",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <IconBarrierBlock size={128} className="text-gray-300" />
        <p className="text-gray-300 font-semibold text-2xl">Coming soon</p>
        <p className="text-gray-300 font-medium">This page is on working...</p>
      </div>
    </MainLayout>
  );
}
