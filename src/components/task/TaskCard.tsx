import { type Task, TaskStatus } from "@/entities/task.entity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CalendarIcon, Clock, InfoIcon, Pencil, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { UpdateTaskCard } from "./UpdateTaskCard";
import { Button } from "../ui/button";
import { DeleteConfirmationCard } from "./DeleteConfirmationCard";
import { useUpdateTask } from "@/hooks/task.hook";

export type TaskProps = {
  task: Task
}

export function TaskCard({ task }: TaskProps) {
  const formattedDate = useMemo(() => {
    return task.dueDate 
      ? format(task.dueDate, "PPP", { locale: es }) 
      : null;
  }, [task]);

  const standardDate = useMemo(() => {
    return task.dueDate 
      ? format(task.dueDate, "dd-MM-yyyy", { locale: es }) 
      : null;
  }, [task]);

  const localizedStatus = useMemo(() => {
    const localizedStatus = {
      [TaskStatus.PENDING]: 'PENDIENTE',
      [TaskStatus.COMPLETED]: 'COMPLETADA'
    }

    return localizedStatus[task.status];
  }, [task]);

  const booleanStatus = useMemo(() => {
    return task.status === TaskStatus.COMPLETED;
  }, [task])

  const { mutate } = useUpdateTask();

  const onChecked = (checked: boolean) => {
    mutate({ 
      ...task, 
      status: checked ? TaskStatus.COMPLETED : TaskStatus.PENDING 
    })
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <Card className="flex items-center justify-between rounded-b-sm">
          <CardHeader>
            <section className="flex gap-6 items-center">
              <Checkbox checked={booleanStatus} onCheckedChange={onChecked} />
              <article className="flex flex-col gap-2">
                <CardTitle>{ task.title }</CardTitle>
                {
                  task.dueDate 
                    ? (
                      <CardDescription className="flex gap-2 items-center font-semibold">
                        <Clock size="16"></Clock>
                        { standardDate }
                      </CardDescription>
                    ) : <></>
                }
              </article>
            </section>
          </CardHeader>
          <CardContent className="py-0">
            <AccordionTrigger></AccordionTrigger>
          </CardContent>
        </Card>
        <AccordionContent>
          <Card className="shadow-inner rounded-b-sm rounded-t-none">
            <CardContent className="flex flex-col gap-6 py-6">
              <section className="flex flex-wrap gap-8 justify-between">
                <article className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <CalendarIcon></CalendarIcon>
                    <h3 className="text-wrap font-semibold">Fecha de vencimiento</h3>
                  </div>
                  { formattedDate ?? "No tiene fecha de vencimiento" }
                </article>
                <article className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <InfoIcon></InfoIcon>
                    <h3 className="text-wrap font-semibold">Estado</h3>
                  </div>
                  { localizedStatus }
                </article>
              </section>
              { task.description ? (
                <section className="flex flex-col gap-4">
                  <header>
                    <h2 className="text-xl text-wrap font-semibold">Descripción</h2>
                  </header>
                  <p>{ task.description }</p>
                </section>
              ) : <></> }
              <section className="flex justify-end gap-4">
                <UpdateTaskCard task={task}>
                  <Button className="flex gap-2" size="icon">
                    <Pencil></Pencil>
                  </Button>
                </UpdateTaskCard>
                <DeleteConfirmationCard id={task.id ?? 0}>
                  <Button variant="destructive" size="icon">
                    <Trash></Trash>
                  </Button>
                </DeleteConfirmationCard>
              </section>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}