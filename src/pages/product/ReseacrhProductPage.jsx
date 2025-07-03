import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconArrowDown,
  IconDots,
  IconBrandShopee,
  IconBrandTiktok,
  IconReportAnalytics,
  IconUserPlus,
  IconShoppingBag,
  IconBarrierBlock,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function ResearchProductPage() {
  const breadcrumbs = [
    {
      icon: IconShoppingBag,
      label: "Transaksi",
      url: "/riset/all",
    },
    {
      label: "Riset Produk",
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
