import { type Task, TaskStatus } from "@/entities/task.entity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";

export type TaskProps = {
  task: Task
}

export function Task({ task }: TaskProps) {
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

  <Card>
    <CardHeader>
      <CardTitle>{ task.title }</CardTitle>
      <CardDescription>{ `${formattedDate} - ${ localizedStatus }` }</CardDescription>
    </CardHeader>
    <CardContent>
      { task.description }
    </CardContent>
  </Card>
}