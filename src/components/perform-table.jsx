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
import { IconSearch, IconChevronDown, IconPin, IconPinFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";

export default function PerformTable({ columns = [], data = [], customButton = null }) {

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [pinnedColumns, setPinnedColumns] = useState(new Set());

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

    const visibleColumns = table.getVisibleFlatColumns();
    const pinnedColumnsArray = visibleColumns.filter(col => pinnedColumns.has(col.id));
    const unpinnedColumnsArray = visibleColumns.filter(col => !pinnedColumns.has(col.id));

    const toggleColumnPin = (columnId) => {
        setPinnedColumns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(columnId)) {
                newSet.delete(columnId);
            } else {
                newSet.add(columnId);
            }
            return newSet;
        });
    };

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

                <div className="flex gap-2 w-full justify-end sm:w-auto">
                    {customButton && customButton}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-18 sm:w-auto">
                                Kolom <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-2 py-1 text-sm font-semibold text-gray-600">
                                Pin/Unpin Kolom
                            </div>
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuItem
                                        key={`pin-${col.id}`}
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={() => toggleColumnPin(col.id)}
                                    >
                                        <span className="capitalize ">
                                            {typeof col.columnDef.header === "function"
                                                ? flexRender(col.columnDef.header, { column: col })
                                                : col.columnDef.header}
                                        </span>
                                        {pinnedColumns.has(col.id) ? (
                                            <IconPinFilled className="w-4 h-4 text-[#2E964C]" />
                                        ) : (
                                            <IconPin className="w-4 h-4 text-gray-400" />
                                        )}
                                    </DropdownMenuItem>
                                ))}

                            <DropdownMenuSeparator />

                            <div className="px-2 py-1 text-sm font-semibold text-gray-600">
                                Tampilkan/Sembunyikan
                            </div>
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

            {/* Mobile/Tablet Table */}
            <div className="block space-y-4">
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <div
                            key={row.id}
                            className="bg-white rounded-lg shadow border-l-4 border-[#2E964C] overflow-hidden"
                        >
                            {/* Mobile: Stack layout for small screens */}
                            <div className="block md:hidden p-4 space-y-3">
                                {/* Pinned columns first */}
                                {pinnedColumnsArray.length > 0 && (
                                    <div className="sticky left-0 top-0 pb-3 mb-3 border-b border-gray-200 bg-[#2E964C]/5 -m-4 p-4 z-10">
                                        {pinnedColumnsArray.map((column) => {
                                            const cell = row.getVisibleCells().find(c => c.column.id === column.id);
                                            return (
                                                <div key={cell?.id} className="flex flex-col mb-2 last:mb-0">
                                                    <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                                        <IconPinFilled className="w-3 h-3 text-[#2E964C]" />
                                                        {typeof column.columnDef.header === "function"
                                                            ? column.columnDef.accessorKey
                                                            : column.columnDef.header || column.columnDef.accessorKey}
                                                    </div>
                                                    <div className="text-gray-900 font-medium">
                                                        {cell && flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Unpinned columns */}
                                {unpinnedColumnsArray.map((column) => {
                                    const cell = row.getVisibleCells().find(c => c.column.id === column.id);
                                    return (
                                        <div key={cell?.id} className="flex flex-col">
                                            <div className="text-xs font-semibold text-gray-500 mb-1">
                                                {typeof column.columnDef.header === "function"
                                                    ? column.columnDef.accessorKey
                                                    : column.columnDef.header || column.columnDef.accessorKey}
                                            </div>
                                            <div className="text-gray-900 font-normal">
                                                {cell && flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Tablet/Desktop: Horizontal scroll with sticky pinned columns */}
                            <div className="hidden md:block relative">
                                <div className="flex">
                                    {/* Pinned columns - Sticky positioned */}
                                    {pinnedColumnsArray.length > 0 && (
                                        <div className="sticky left-0 z-20 flex bg-[#2E964C]/5 border-r-2 border-[#2E964C]/30 shadow-md">
                                            {pinnedColumnsArray.map((column) => {
                                                const cell = row.getVisibleCells().find(c => c.column.id === column.id);

                                                // // Tentukan lebar berdasarkan tipe konten
                                                // const isComplexCell = column.columnDef.cell && typeof column.columnDef.cell === 'function';
                                                // const columnWidth = isComplexCell ? 'min-w-[300px] w-[300px]' : 'min-w-[150px] w-[150px]';

                                                return (
                                                    <div
                                                        key={cell?.id}
                                                        className={`p-3 border-r border-gray-200 last:border-r-0 flex flex-col w-max`}
                                                    >
                                                        <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                                            <IconPinFilled className="w-3 h-3 text-[#2E964C] flex-shrink-0" />
                                                            <span className="truncate">
                                                                {typeof column.columnDef.header === "function"
                                                                    ? column.columnDef.accessorKey
                                                                    : column.columnDef.header || column.columnDef.accessorKey}
                                                            </span>
                                                        </div>
                                                        {/* Container untuk cell content tanpa truncate jika kompleks */}
                                                        <div className={`text-gray-900 font-medium`}>
                                                            {cell && flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Scrollable area for unpinned columns */}
                                    <div className="flex-1 overflow-x-auto">
                                        <div className="flex">
                                            {unpinnedColumnsArray?.map?.((column) => {
                                                const cell = row.getVisibleCells().find(c => c.column.id === column.id);
                                                if (!cell) return null;

                                                // Lebar dinamis berdasarkan konten
                                                // const isComplexCell = column.columnDef.cell && typeof column.columnDef.cell === 'function';
                                                // const columnWidth = isComplexCell ? '300px' : '200px';

                                                return (
                                                    <div
                                                        key={cell.id}
                                                        className="p-3 border-r border-gray-200 last:border-r-0 flex flex-col w-max"
                                                    >
                                                        <div className="text-xs font-semibold text-gray-500 mb-1 truncate">
                                                            {typeof column.columnDef.header === "function"
                                                                ? (column.columnDef.accessorKey || column.id)
                                                                : (column.columnDef.header || column.columnDef.accessorKey || column.id)}
                                                        </div>
                                                        <div className={`text-gray-900 font-normal`}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow">
                        Data Tidak Tersedia.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
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