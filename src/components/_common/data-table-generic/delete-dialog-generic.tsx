"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icons } from "@/components/ui/icons";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DeleteCommand } from "@/types/commands/base/base-command";
import { BusinessResult } from "@/types/response/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

interface DeleteBaseEntitysDialogProps<TData>
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean;
  list: Row<TData>["original"][];
  onSuccess?: () => void;
  query_keys?: string[];
  deleteFunc?: (command: DeleteCommand) => Promise<BusinessResult<null>>;
}

export function DeleteBaseEntitysDialog<TData>({
  showTrigger = true,
  query_keys = ["data"],
  list,
  onSuccess,
  deleteFunc,
  ...props
}: DeleteBaseEntitysDialogProps<TData>) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const queryClient = useQueryClient();

  function hasId(item: any): item is { id: string } {
    return item && typeof item.id === "string";
  }

  function onDelete() {
    startDeleteTransition(async () => {
      if (!deleteFunc) {
        toast.error("Delete function is not defined.");
        return; // Early return if deleteFunc is undefined
      }

      try {
        for (const task of list) {
          if (hasId(task)) {
            const command: DeleteCommand = {
              id: task.id,
              isPermanent: false,
            };
            const response = await deleteFunc(command);
            if (response.status === 1) {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
          } else {
            toast.error("Fail!");
          }
        }
        props.onOpenChange?.(false);
        if (onSuccess) {
          queryClient.invalidateQueries({ queryKey: query_keys });
          onSuccess();
        }
        props.onOpenChange?.(false);
      } catch (error) {
        toast.error(error as string);
        props.onOpenChange?.(false);
      }
    });
  }

  if (isDesktop) {
    return (
      list.length > 0 && (
        <>
          {showTrigger && list.length > 0 ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                  Delete ({list.length})
                </Button>
              </DialogTrigger>

              <DialogContent className="shadow-lg">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently
                    deleteFunc your{" "}
                    <span className="font-medium">{list.length}</span>
                    {list.length === 1 ? " task" : " list"} from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    aria-label="Delete selected rows"
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isDeletePending}
                  >
                    {isDeletePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog {...props}>
              <DialogContent className="shadow-lg">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently
                    deleteFunc your{" "}
                    <span className="font-medium">{list.length}</span>
                    {list.length === 1 ? " task" : " list"} from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    aria-label="Delete selected rows"
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isDeletePending}
                  >
                    {isDeletePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </>
      )
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({list.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently deleteFunc your{" "}
            <span className="font-medium">{list.length}</span>
            {list.length === 1 ? " task" : " list"} from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
