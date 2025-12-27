"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Subscriptions } from "@/types/subs.types";
import { Button } from "../ui/button";
import SubDelete from "./sub-list-delete";

export const columns: ColumnDef<Subscriptions>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "renewal_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Renewal Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = row.getValue("renewal_date") as string | Date;
      const newDate = new Date(val).toLocaleDateString();
      return <div>{newDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const val = row.original.subscription_id;
      return <SubDelete subscription_id={val} />;
    },
  },
];
