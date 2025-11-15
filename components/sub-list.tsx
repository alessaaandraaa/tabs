"use client";
import {
  getSubsQuery,
  useDeleteSubsQuery,
} from "@/queries/subscriptions.queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { toast } from "sonner";

type SubsList = {
  subscription_id: number;
  name: string;
  type: string;
  source: string;
  frequency: string;
  price: number;
  renewal_date: Date;
};

export default function SubList() {
  const { data: fetchedSubs = [], error, isLoading } = getSubsQuery();
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
        {fetchedSubs.map((sub) => (
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
  );
}
