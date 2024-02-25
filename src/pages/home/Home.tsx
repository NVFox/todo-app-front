
import { CreateTaskCard } from "@/components/task/CreateTaskCard";
import { TaskCard } from "@/components/task/TaskCard";
import { TaskCardList } from "@/components/task/TaskCardList";
import { Button } from "@/components/ui/button";
import { useAllTasks } from "@/hooks/task.hook";
import { BaseLayout } from "@/layouts/BaseLayout";
import { Plus } from "lucide-react";

export function Home() {
  const { data: tasks } = useAllTasks();

  return (
    <BaseLayout>
      <section className="flex flex-col sm:w-4/6 w-3/6 py-8 m-auto gap-8">
        <h1 className="text-5xl text-center font-bold">Tu Lista de Tareas</h1>
        <TaskCardList>
          { Array.isArray(tasks) && tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          )) }
        </TaskCardList>
        <CreateTaskCard>
          <Button className="w-1/2 m-auto">
            <Plus></Plus>
            Añadir Tarea
          </Button>
        </CreateTaskCard>
      </section>
    </BaseLayout>
  )
}