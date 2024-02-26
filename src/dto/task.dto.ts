import { Task } from "@/entities/task.entity"

export type TaskDto = {
  id: number,
  title: string,
  description: string|null,
  dueDate: string|null,
  status: string
}

export type CreateUpdateTaskDto = Omit<TaskDto, 'id'>

export type TaskFields = keyof Task