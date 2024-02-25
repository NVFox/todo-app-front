import { Search } from "lucide-react";

export function NotFoundTasks() {
  return (
    <section className="flex flex-col text-center justify-center items-center">
      <Search size={250}></Search>
      <h2 className="text-2xl font-semibold">Aún no has creado ninguna tarea</h2>
      <p className="text-gray-500">Añade tu primera tarea con el botón de abajo</p>
    </section>
  )
}