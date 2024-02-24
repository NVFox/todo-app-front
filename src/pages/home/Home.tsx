
import { CreateTaskCard } from "@/components/task/CreateTaskCard";
import { TaskCard } from "@/components/task/TaskCard";
import { TaskCardList } from "@/components/task/TaskCardList";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/entities/task.entity";
import { BaseLayout } from "@/layouts/BaseLayout";
import { Plus } from "lucide-react";

const task: Task = {
  id: 0,
  title: "Tarea 1",
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa ad consequuntur quasi? Cumque id minus similique? Itaque temporibus maxime voluptatum eveniet, facere, vero et asperiores dignissimos illum minima perspiciatis totam a, animi ut pariatur. Consequatur reiciendis explicabo laboriosam provident quisquam deserunt eaque magnam deleniti totam! Harum quasi, voluptatem debitis mollitia, distinctio repellat, placeat tempore sint magni expedita odit ea delectus explicabo adipisci dolorem eveniet laborum. Distinctio esse enim deserunt.",
  dueDate: new Date(),
  status: TaskStatus.PENDING
}

export function Home() {
  return (
    <BaseLayout>
      <section className="flex flex-col sm:w-4/6 w-3/6 py-8 m-auto gap-8">
        <h1 className="text-5xl text-center font-bold">Tu Lista de Tareas</h1>
        <TaskCardList>
          <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} />
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