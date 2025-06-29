import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { DataTablePinning } from "@/components/data-table-pinning";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconDots, IconReportAnalytics } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "@/components/Datepicker";
import { useState } from "react";

const columnCommission = [
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
    header: () => <div className="ml-10">Nama Host</div>,
    accessorKey: "name",
  },
  {
    header: "Tanggal",
    accessorKey: "date",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Order",
    accessorKey: "order",
  },
  {
    header: "Commission",
    accessorKey: "commission",
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
const columnReportDaily = [
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
    id: "name",
    accessorKey: "name",
    header: () => (
      <div className="pl-4 w-xs font-semibold text-primary">Nama Host</div>
    ),
    cell: ({ row, getValue }) => (
      <div className="pl-4" key={row.original.id}>
        {getValue()}
      </div>
    ),
  },
  {
    id: "date",
    header: () => (
      <div className="w-xs font-semibold text-primary">Tanggal</div>
    ),
    accessorKey: "date",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Studio",
    accessorKey: "studio",
  },
  {
    header: "Order",
    accessorKey: "order",
  },
  {
    header: "Order",
    accessorKey: "order",
  },
  {
    header: "Order",
    accessorKey: "order",
  },
  {
    header: "Order",
    accessorKey: "order",
  },
  {
    header: "Order",
    accessorKey: "order",
  },
  {
    header: "Sales",
    accessorKey: "sales",
  },
  {
    header: "Paid",
    accessorKey: "paid",
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
    name: "John Doe",
    phone: "081234567890",
    studio: "Studio 1",
  },
  {
    name: "Alice Smith",
    phone: "082198765432",
    studio: "Studio 2",
  },
  {
    name: "David Lee",
    phone: "083112233445",
    studio: "Studio 1",
  },
  {
    name: "Luna Malik",
    phone: "085556677889",
    studio: "Studio 3",
  },
  {
    name: "Carlos Vega",
    phone: "087712345678",
    studio: "Studio 1",
  },
];

export default function FinanceCommissionReportPage() {
  const [selected, setSelected] = useState("report-commission");

  const breadcrumbs = [
    {
      icon: IconReportAnalytics,
      label: "Riset",
      url: "/riset/all",
    },
    {
      label: "Riset Keuangan",
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      {/* Action Button */}
      <div className="flex gap-2">
        <DatePicker />

        <div className="flex-1"></div>
        <div className="self-end">
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-[180px] border-secondary/20 shadow-secondary/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="report-commission">Laporan Komisi</SelectItem>
              <SelectItem value="report-daily">Laporan Harian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {/* <DataTable
        columns={
          selected == "report-commission" ? columnCommission : columnReportDaily
        }
        data={data}
      /> */}
      <DataTablePinning columns={columnReportDaily} data={data} />
    </MainLayout>
  );
}
