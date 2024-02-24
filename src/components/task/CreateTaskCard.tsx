import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "../ui/date-picker"
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
import { Textarea } from "../ui/textarea"

export type CreateTaskCardProps = {
  children: ReactNode
}

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
        <form className="py-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="Título de tu tarea" autoComplete="off" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="due-date">Fecha de vencimiento</Label>
              <DatePicker />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Estado</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="PENDING">Pendiente</SelectItem>
                  <SelectItem value="COMPLETED">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" placeholder="Descripción" />
            </div>
          </div>
        </form>
        <DialogFooter className="flex justify-center">
          <Button>
            <Plus />
            Añadir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
