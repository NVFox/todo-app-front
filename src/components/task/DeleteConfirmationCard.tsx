import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/task.hook";

export type DeleteConfirmationCardProps = {
  id: number,
  children: ReactNode
}

export function DeleteConfirmationCard({ id, children }: DeleteConfirmationCardProps) {
  const { mutate } = useDeleteTask();

  const onDelete = () => {
    mutate(id);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">¿Estás seguro?</DialogTitle>
          <DialogDescription>Esta acción es irreversible!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onDelete} variant="destructive" className="flex gap-2">
            <Trash></Trash>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}