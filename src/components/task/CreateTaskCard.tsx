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
import { Plus } from "lucide-react"
import { CreateUpdateTaskForm } from "./CreateUpdateTaskForm"
import { z } from "zod"
import { TaskStatus } from "@/entities/task.entity"
import { useCreateTask } from "@/hooks/task.hook"

export type CreateTaskCardProps = {
  children: ReactNode
}

const formSchema = z.object({
  id: z.number().default(0),
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

export function CreateTaskCard ({ children }: CreateTaskCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Crea una nueva tarea</DialogTitle>
        </DialogHeader>
        <CreateUpdateTaskForm
          schema={formSchema} 
          useAction={useCreateTask}
          buttons={
            <DialogFooter className="flex justify-center">
              <Button>
                <Plus />
                Añadir
              </Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
