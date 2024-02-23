import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "./ui/date-picker"

export function CreateTaskCard () {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crear tarea</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="Título de tu tarea" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="due-date">Fecha de vencimiento</Label>
              <Input id="due-date" placeholder="Selecciona una fecha" />
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
              <Label htmlFor="status">Descripción</Label>
              <DatePicker />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Crear</Button>
      </CardFooter>
    </Card>
  )
}
