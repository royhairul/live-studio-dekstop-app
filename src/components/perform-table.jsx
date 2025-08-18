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

export default function PerformTable({ columns = [], data = [] }) {    
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
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
    });

    const visibleColumnCount =
        table.getVisibleFlatColumns().length

    return (
        <div className="bg-[#2E964C]/10 w-full rounded-lg p-6 mx-auto">
            {/* Search + Column Toggle */}
            <div className="mb-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full max-w-sm ">
                    <Input
                        placeholder={`Cari ...`}
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-10 py-2 rounded-full text-gray-700 focus:outline-none shadow-sm bg-accent-foreground"
                    />
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="ml-auto">
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
                                    onCheckedChange={(value) =>
                                        col.toggleVisibility(!!value)
                                    }
                                >
                                    {typeof col.columnDef.header === "function"
                                        ? col.columnDef.accessorKey
                                        : col.columnDef.header || col.columnDef.accessorKey}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table Header */}
            <div
                className="hidden sm:grid gap-4 px-4 text-gray-900 font-semibold tracking-wide border-b border-green-500 pb-2"
                style={{
                    gridTemplateColumns: `repeat(${visibleColumnCount}, minmax(0, 1fr))`,
                }}
            >
                {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                        <div key={header.id} className="col-span-1">
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
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
                            className="bg-white rounded-lg p-4 grid items-center gap-4 shadow border-l-4 border-[#2E964C]"
                            style={{
                                gridTemplateColumns: `repeat(${row.getVisibleCells().length}, minmax(0, 1fr))`,
                            }}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <div
                                    key={cell.id}
                                    className="col-span-1 text-gray-900 font-normal"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
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
            <div className="flex justify-between items-center mt-4">
                <Button
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Sebelumnya
                </Button>
                <span className="text-sm">
                    Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
                    {table.getPageCount()}
                </span>
                <Button
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Selanjutnya
                </Button>
            </div>
        </div>
    );
}
