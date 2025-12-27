import { useDeleteSubsQuery } from "@/queries/subscriptions.queries";
import { Button } from "../ui/button";
import { toast } from "sonner";

type deleteProps = {
  subscription_id: number;
};
export default function SubDelete({ subscription_id }: deleteProps) {
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
    <Button
      variant="destructive"
      className="hover:bg-red-900"
      onClick={() => deleteSubscription(subscription_id)}
    >
      Delete
    </Button>
  );
}
