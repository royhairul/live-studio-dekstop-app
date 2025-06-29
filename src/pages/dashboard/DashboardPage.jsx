import MainLayout from "@/layouts/main-layout";
import {
  IconLayoutGridFilled,
  IconSparkles,
  IconCoins,
  IconShoppingCart,
  IconEye,
  IconSearch,
  IconArrowDown,
  IconDots,
  IconBrandShopee,
  IconBrandTiktok,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useState } from "react";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Nama Host",
    accessorKey: "name",
  },
  {
    header: "Nama Akun",
    accessorKey: "accountName",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"font-semibold"}
        >
          Email
          <IconArrowDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    header: "Platform",
    accessorKey: "platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform");
      return (
        <div
          className={`flex items-center gap-2 px-2 p-1 w-max rounded font-medium text-xs ${
            platform === "Shopee"
              ? "bg-amber-600/20 text-amber-600"
              : "bg-black/20 text-black"
          }`}
        >
          {platform === "Shopee" ? (
            <IconBrandShopee size={20} />
          ) : (
            <IconBrandTiktok size={20} />
          )}
          {platform}
        </div>
      );
    },
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Penonton",
    accessorKey: "livewatch",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const data = [
  {
    id: "m5gr84i9",
    name: "John Doe",
    accountName: "Toko Jaya Abadi",
    studio: "Studio 1",
    platform: "Shopee",
    livewatch: 100,
    amount: 1000,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    name: "Alice Smith",
    accountName: "Toko Bunga",
    studio: "Studio 2",
    platform: "Shopee",
    livewatch: 80,
    amount: 242000,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    name: "David Lee",
    accountName: "Toko Elektronik",
    studio: "Studio 1",
    platform: "Tokopedia",
    livewatch: 120,
    amount: 204099,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    name: "Luna Malik",
    accountName: "Toko Fashion",
    studio: "Studio 3",
    platform: "Shopee",
    livewatch: 95,
    amount: 2308122,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    name: "Carlos Vega",
    accountName: "Toko Gadget",
    studio: "Studio 1",
    platform: "TikTok",
    livewatch: 45,
    amount: 500021,
    status: "failed",
    email: "carmella@example.com",
  },
];

export default function DashboardPage() {
  const [dailyReport, setDailyReport] = useState("today");
  const [studio, setStudio] = useState("studio1");
  const [sortBy, setSortBy] = useState("most-view");

  const breadcrumbs = [
    { icon: IconLayoutGridFilled, label: "Dashboard", url: "/dashboard" },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Report */}
      <div className="p-4 bg-primary text-primary-foreground rounded-md flex flex-col gap-8 mb-4">
        <h1 className="title flex gap-2 font-bold text-xl">
          <IconSparkles className="w-8 h-8" />
          Overview
        </h1>

        <div className="grid grid-cols-3 divide-accent-foreground">
          <div>
            <h3 className="flex gap-2 items-center font-semibold text-xs">
              <IconCoins className="w-6 h-6" />
              Total Omset
            </h3>
            <p className="font-bold text-2xl">Rp. 100.000</p>
          </div>
          <div>
            <h3 className="flex gap-2 items-center font-semibold text-xs">
              <IconShoppingCart className="w-6 h-6" />
              Transaksi Hari Ini
            </h3>
            <p className="font-bold text-2xl">105</p>
          </div>
          <div>
            <h3 className="flex gap-2 items-center font-semibold text-xs">
              <IconEye className="w-6 h-6" />
              Total Penonton
            </h3>
            <p className="font-bold text-2xl">88</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Label className={"text-sm text-primary font-semibold"}>
              Daily Report
            </Label>
            <Select value={dailyReport} onValueChange={setDailyReport}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="yesterday">Kemarin</SelectItem>
                <SelectItem value="week">7 Hari Yang Lalu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={"text-sm text-primary font-semibold"}>
              Studio
            </Label>
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
          <div className="flex flex-col gap-2">
            <Label className={"text-sm text-primary font-semibold"}>
              Sort By
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-view">Most View</SelectItem>
                <SelectItem value="most-transaction">
                  Most Transaction
                </SelectItem>
                <SelectItem value="most-omset">Most Omset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="self-end w-full">
            <Input
              type={"text"}
              icon={<IconSearch />}
              placeholder={"Search..."}
              className={"w-full bg-white"}
            />
          </div> */}
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </MainLayout>
  );
}
