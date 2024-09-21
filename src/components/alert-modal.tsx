"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAlertDialoag from "@/hooks/useAlertDialog";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import useResponsive from "@/hooks/useResponsive";
import DrawerView from "./drawer-view";
import { Button } from "./ui/button";

export function AlertModal() {
  const { close, show, action } = useAlertDialoag();
  const [loading, setLoading] = useState<boolean>(false);
  const { isMobile } = useResponsive();

  const handleAction = async () => {
    setLoading(true);
    await action();
    setLoading(false);
  };

  if (isMobile) {
    return (
      <DrawerView
        open={show}
        title="Are you sure?"
        onOpenChange={(e) => {
          if (!e) {
            close();
          }
        }}
      >
        <div className="flex  flex-col w-full gap-2 py-4">
          <Button onClick={handleAction} disabled={loading}>
            {loading && <Spinner className="text-white w-4 " />}
            Continue
          </Button>
          <Button variant={"outline"} onClick={close}>
            Cancel
          </Button>
        </div>
      </DrawerView>
    );
  }

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to delete this category?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            disabled={loading}
            className="gap-1"
          >
            {loading && <Spinner className="text-white w-4 " />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
