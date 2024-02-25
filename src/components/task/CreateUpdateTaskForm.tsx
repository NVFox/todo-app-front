import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { Task } from "@/entities/task.entity";
import { UseMutationResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ValidationException } from "@/dto/error.dto";
import { TaskFields } from "@/dto/task.dto";

export type CreateUpdateTaskFormProps = {
  task?: Task,
  schema: z.ZodType<Task>,
  useAction: () => UseMutationResult<Task, Error, Task, unknown>,
  buttons: ReactNode
}

export function CreateUpdateTaskForm({ schema, task, useAction, buttons }: CreateUpdateTaskFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {...task}
  });

  const { mutateAsync } = useAction();

  const onSubmit = async (payload: z.infer<typeof schema>) => {
    try {
      await mutateAsync({...task, ...payload});
    } catch (error) {
      if (error instanceof ValidationException) {
        error.errors.forEach(e => {
          e.messages.forEach(message => {
            form.setError(e.field as TaskFields, {
              message
            })
          })
        })
      } 
    }
  }

  return (
    <Form {...form} key={task?.id ?? 0} >
      <form onSubmit={form.handleSubmit(onSubmit, (data) => alert(JSON.stringify(data)))} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input id="title" placeholder="Título de tu tarea" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de vencimiento</FormLabel>
              <FormControl>
                <DatePicker field={field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="PENDING">Pendiente</SelectItem>
                    <SelectItem value="COMPLETED">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descripción" {...field} 
                  value={field.value ? field.value : undefined} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { buttons }
      </form>
    </Form>
  )
}