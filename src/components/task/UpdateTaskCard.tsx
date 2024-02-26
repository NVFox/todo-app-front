import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from "../ui/dialog"
import { ReactNode } from "react"
import { Pencil } from "lucide-react"
import { CreateUpdateTaskForm } from "./CreateUpdateTaskForm"
import { z } from "zod"
import { Task, TaskStatus } from "@/entities/task.entity"
import { useUpdateTask } from "@/hooks/task.hook"

export type UpdateTaskCardProps = {
  task: Task,
  children: ReactNode
}

const formSchema = z.object({
  id: z.number(),
  title: z.string({
      required_error: "El título es un campo requerido."
    })
    .min(3, "El título debe contener al menos 3 caracteres")
    .max(150, "El título no puede contener más de 150 caracteres"),
  description: z.string()
    .min(3, "El título debe contener al menos 3 caracteres")
    .max(255, "El título no puede contener más de 255 caracteres")
    .nullish(),
  dueDate: z.date({
      invalid_type_error: "La fecha debe tener un formato válido."
    })
    .nullish(),
  status: z.nativeEnum(TaskStatus, {
    required_error: "El estado es un campo requerido.",
    invalid_type_error: "Seleccione únicamente uno de los valores permitidos"
  })
})

export function UpdateTaskCard ({ task, children }: UpdateTaskCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Modifica los detalles de tu tarea</DialogTitle>
        </DialogHeader>
        <CreateUpdateTaskForm
          task={task}
          schema={formSchema} 
          useAction={useUpdateTask}
          buttons={
            <DialogFooter className="flex justify-center">
              <Button type="submit" className="flex gap-2">
                <Pencil />
                Modificar
              </Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
