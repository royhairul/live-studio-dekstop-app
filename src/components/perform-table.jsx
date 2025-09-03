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
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";

export default function PerformTable({ columns = [], data = [], customButton = null }) {

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    const memoColumns = useMemo(() => columns, [columns]);
    const memoData = useMemo(() => data, [data]);

    const table = useReactTable({
        data: memoData,
        columns: memoColumns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        autoResetPageIndex: false,
    });

    const visibleColumnCount =
        table.getVisibleFlatColumns().length

    return (
        <div className="bg-[#2E964C]/10 w-full rounded-lg p-6 mx-auto">
            {/* Search + Column Toggle */}
            <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full max-w-sm">
                    <Input
                        placeholder="Cari ..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-10 py-2 rounded-full text-gray-700 focus:outline-none shadow-sm bg-accent-foreground"
                    />
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                    {customButton && customButton}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                Kolom <IconChevronDown className="ml-2 w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        className="capitalize"
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                    >
                                        {typeof col.columnDef.header === "function"
                                            ? col.columnDef.accessorKey
                                            : col.columnDef.header || col.columnDef.accessorKey}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Table Header (desktop only) */}
            <div
                className="hidden md:grid gap-4 text-gray-900 font-semibold tracking-wide border-b border-green-500 pb-2"
                style={{
                    gridTemplateColumns: `repeat(${visibleColumnCount}, minmax(0, 1fr))`,
                }}
            >
                {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                        <div key={header.id} className="col-span-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                    ))
                )}
            </div>

            {/* Table Body */}
            <div className="mt-4 space-y-4">
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <div
                            key={row.id}
                            className="bg-white rounded-lg p-4 shadow border-l-4 border-[#2E964C] 
                       flex flex-col md:grid gap-4"
                            style={{
                                gridTemplateColumns: `repeat(${row.getVisibleCells().length}, minmax(0, 1fr))`,
                            }}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <div
                                    key={cell.id}
                                    className="col-span-1 text-gray-900 font-normal"
                                >
                                    {/* Label tampil hanya di mobile */}
                                    <div className="block md:hidden text-xs font-semibold text-gray-500">
                                        {typeof cell.column.columnDef.header === "function"
                                            ? cell.column.columnDef.accessorKey
                                            : cell.column.columnDef.header ||
                                            cell.column.columnDef.accessorKey}
                                    </div>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-4">
                        Data Tidak Tersedia.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                <Button
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="w-full sm:w-auto"
                >
                    Sebelumnya
                </Button>
                <span className="text-sm text-center">
                    Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
                    {table.getPageCount()}
                </span>
                <Button
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="w-full sm:w-auto"
                >
                    Selanjutnya
                </Button>
            </div>
        </div>
    );

}
