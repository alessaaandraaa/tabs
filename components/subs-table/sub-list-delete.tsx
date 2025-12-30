"use client";

import { useDeleteSubsQuery } from "@/queries/subscriptions.queries";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react"; // Added useEffect
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

type deleteProps = {
  subscription_id: number;
};

export default function SubDelete({ subscription_id }: deleteProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [checkState, setCheckState] = useState(false);

  const del = useDeleteSubsQuery();

  useEffect(() => {
    const isSkipped = localStorage.getItem("skip-delete-warning") === "true";
    if (isSkipped) {
      setShowDialog(true);
    }
  }, []);

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

  const handleDoNotShow = () => {
    if (checkState) {
      console.log("User does not want to see warning again.");
      localStorage.setItem("skip-delete-warning", "true");
      setShowDialog(true);
    }
  };

  return showDialog ? (
    <Button
      variant="destructive"
      className="hover:bg-red-900"
      onClick={() => deleteSubscription(subscription_id)}
    >
      Delete
    </Button>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="hover:bg-red-900">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-4">
              <p>
                This action cannot be undone. This will permanently delete your
                subscription.
              </p>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="do-not-show"
                  onCheckedChange={(e) => setCheckState(e as boolean)}
                />
                <Label htmlFor="do-not-show">
                  Do not show this warning again
                </Label>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteSubscription(subscription_id);
              handleDoNotShow();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
