"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  IconArrowDown,
  IconChevronDown,
  IconDots,
  IconSearch,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function DataTablePinning({ columns, pinning = [], data }) {
  const [sorting, setSorting] = React.useState();
  const [columnFilters, setColumnFilters] = React.useState();
  const [columnVisibility, setColumnVisibility] = React.useState();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnPinning, setColumnPinning] = React.useState({
    left: pinning,
    right: [],
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnPinning,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onColumnPinningChange: setColumnPinning,
  });

  const pinnedLeft = table.getState().columnPinning.left;
  const getLeftValue = (id) => {
    let left = 0;
    for (const colId of pinnedLeft) {
      if (colId === id) break;
      left += 150; // Misal: lebar tetap 150px per pinned column
    }
    return `${left}px`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          icon={<IconSearch />}
          placeholder="Search..."
          // value={table.getColumn("name")?.getFilterValue() ?? ""}
          // onChange={(event) =>
          //   table.getColumn("name")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm bg-white"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
              Columns <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="pb-4 shadow-sm rounded-lg border border-gray-400/50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const pinnedLeft = table.getState().columnPinning.left;
                  const pinnedIndex = pinnedLeft.indexOf(header.column.id);
                  const leftValue =
                    pinnedIndex !== -1 ? `${pinnedIndex * 150}px` : undefined;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "w-[150px] min-w-[150px] max-w-[150px]",
                        pinnedIndex !== -1 &&
                          "sticky z-20 shadow-md bg-gray-50 "
                      )}
                      style={pinnedIndex !== -1 ? { left: leftValue } : {}}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const pinnedLeft = table.getState().columnPinning.left;
                    const pinnedIndex = pinnedLeft.indexOf(cell.column.id);

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          pinnedIndex !== -1 && "sticky z-10 shadow bg-white"
                        )}
                        style={
                          pinnedIndex !== -1
                            ? { left: getLeftValue(cell.column.id) }
                            : {}
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Data Tidak Tersedia.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-col items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-gray-500">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
