import { type Task, TaskStatus } from "@/entities/task.entity";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export type TaskProps = {
  task: Task
}

export function TaskCard({ task }: TaskProps) {
  const formattedDate = useMemo(() => {
    return task.dueDate 
      ? format(task.dueDate, "PPP", { locale: es }) 
      : "";
  }, [task]);

  const localizedStatus = useMemo(() => {
    const localizedStatus = {
      [TaskStatus.PENDING]: 'PENDIENTE',
      [TaskStatus.COMPLETED]: 'COMPLETADA'
    }

    return localizedStatus[task.status];
  }, [task]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <Card className="flex items-center justify-between rounded-b-sm">
          <CardHeader>
            <article className="flex gap-6 items-center">
              <Checkbox />
              <CardTitle>{ task.title }</CardTitle>
            </article>
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
                  { formattedDate }
                </article>
                <article className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <InfoIcon></InfoIcon>
                    <h3 className="text-wrap font-semibold">Estado</h3>
                  </div>
                  { localizedStatus }
                </article>
              </section>
              <section className="flex flex-col gap-4">
                <header>
                  <h2 className="text-xl text-wrap font-semibold">Descripción</h2>
                </header>
                <p>{ task.description }</p>
              </section>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}