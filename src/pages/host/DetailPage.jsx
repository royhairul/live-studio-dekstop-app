import MainLayout from "@/layouts/main-layout";
import { DataTable } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconUsersGroup,
  IconUserPlus,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStudios } from "@/hooks/studio/useStudios";
import { useHosts } from "@/hooks/host/useHosts";
import { useHostById } from "@/hooks/host/useHostById";
import { useUserById } from "@/hooks/user/useUserById";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns-tz";
import { formatTime } from "@/helpers/formatTime";
import { Badge } from "@/components/ui/badge";

export default function HostDetailPage() {
  const { studio } = useStudios();
  const [selectedStudioId, setSelectedStudioId] = useState("all");
  const { hosts, refetch } = useHosts();

  const { id } = useParams();
  const { host } = useHostById(id);

  const { user } = useUserById(host.ID);

  const { data: attendances } = useQuery({
    queryKey: ["attendances"],
    queryFn: async () => {
      const res = await axios.get(apiEndpoints.attendance.index());
      return res.data.data;
    },
  });

  console.log(attendances);

  const breadcrumbs = [
    { icon: IconUsersGroup, label: "Host", url: "/host/all" },
    { label: "Detail Host" },
  ];

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
      header: "Tanggal",
      cell: ({ row }) => <div>{row.original.checked_in.split("T")[0]}</div>,
    },
    {
      header: "Check In",
      accessorKey: "checked_in",
      cell: ({ row }) => <div>{formatTime(row.original.checked_in)}</div>,
    },
    {
      header: "Check Out",
      accessorKey: "checked_out",
      cell: ({ row }) => {
        const value = row.original.checked_out;

        return (
          <div>
            {value ? (
              formatTime(value)
            ) : (
              <span className="font-medium italic text-gray-400">
                Belum checkout
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "Catatan",
      accessorKey: "Note",
      cell: ({ row }) => (
        <Badge className="bg-primary/10 text-primary">
          {row.original.Note}
        </Badge>
      ),
    },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="bg-white p-4 ">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg/7 font-semibold text-gray-900">Detail Host</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            Personal information and user account details.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/8 font-semibold text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {host.Name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/8 font-semibold text-gray-900">Studio</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {host.Studio?.Name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/8 font-semibold text-gray-900">Phone</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {host.Phone}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <DataTable columns={columns} data={attendances} />
    </MainLayout>
  );
}
