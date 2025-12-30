"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { TypeFilter } from "./sub-list-filter";
import { useState } from "react";
import { toast, Toaster } from "sonner";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function SubsList<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="cursor select-none">
      <div>
        <TypeFilter table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

/*"use client";
import { useDeleteSubsQuery } from "@/queries/subscriptions.queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";

type Subs = {
  subscription_id: number;
  name: string;
  type: string;
  source: string;
  frequency: string;
  price: number;
  renewal_date: Date;
  free_trial: boolean;
  auto_renew: boolean;
};

type SubListProps = {
  subscriptions: Subs[];
};

export default function SubList({ subscriptions }: SubListProps) {
  const del = useDeleteSubsQuery();
  const deleteSubscription = (id: number) => {
    del.mutate(
      { sub_id: id },
      {
        onSuccess: () => {
          toast.success("Succesfully deleted subscription.");
        },
      }
    );
  };

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Renewal Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={`${sub.subscription_id}-${sub.name}`}>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{sub.type}</TableCell>
                <TableCell>{sub.frequency}</TableCell>
                <TableCell>Php {sub.price}</TableCell>
                <TableCell>
                  {new Date(sub.renewal_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    className="hover:bg-red-900"
                    onClick={() => deleteSubscription(sub.subscription_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </>
  );
}
*/
