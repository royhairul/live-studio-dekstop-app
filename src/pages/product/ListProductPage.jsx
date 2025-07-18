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

export default function ListProductPage() {
  const [studio, setStudio] = useState("studio1");

  const breadcrumbs = [
    {
      icon: IconReportAnalytics,
      label: "Riset",
      url: "/riset/all",
    },
    {
      label: "Riset Produk",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Button */}
      <div className="flex gap-2">
        <div className="flex-1"></div>

        <div className="self-end">
          <Select value={studio} onValueChange={setStudio}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio1">Studio 1</SelectItem>
              <SelectItem value="studio2">Studio 2</SelectItem>
              <SelectItem value="studio3">Studio 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex">
        {/* Product */}

        <div className="card w-[250px]">
          <img
            src="https://2.bp.blogspot.com/-UFs0t-FKb_E/WZ5lvoiAqnI/AAAAAAAANwo/vUFk7UQlP-8-JLvh-vLQlqkQilCxna_KACLcBGAs/s1600/bitebrands-contoh-desain-gambar-kemasan-packaging-keren-bagus-unik-kreatif-produk-kecantikan-kosmetik-makeup_03.jpg"
            alt=""
          />
          <div className="flex flex-wrap">
            <div className="bg-amber-700 w-max text-xs p-1 text-white">
              Mal | Ori
            </div>
            <h2 className="text-base font-medium">
              Fresh - Produk Kecantikan Wanita
            </h2>
          </div>
          <div className="link flex gap-2">
            <a href="#" className="text-blue-500 text-xs">
              Kunjungi halaman Produk
            </a>
            <a href="#" className="text-amber-700 text-xs">
              Info Affiliasi
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
