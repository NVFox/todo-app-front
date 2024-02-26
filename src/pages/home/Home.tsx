
import { CreateTaskCard } from "@/components/task/CreateTaskCard";
import { TaskCardList } from "@/components/task/TaskCardList";
import { Button } from "@/components/ui/button";
import { useAllTasks } from "@/hooks/task.hook";
import { BaseLayout } from "@/layouts/BaseLayout";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Home() {
  const [ params ] = useSearchParams()
  const [ pageRequest, setPageRequest ] = useState({
    page: 1,
    perPage: 4
  })

  useEffect(() => {
    setPageRequest({
      page: params.get("pageNumber") ? Number(params.get("pageNumber")) : 1,
      perPage: params.get("perPage") ? Number(params.get("perPage")) : 4,
    })
  }, [params])

  const { data: tasks, isLoading } = useAllTasks(pageRequest);

  return (
    <BaseLayout>
      <section className="flex flex-col sm:w-5/6 md:w-4/6 w-4/6 py-8 m-auto gap-8">
        <h1 className="text-5xl text-center font-bold">Tu Lista de Tareas</h1>
        <TaskCardList paginated tasks={tasks ?? []} loading={isLoading}>
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