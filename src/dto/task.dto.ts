export type TaskDto = {
  id: number,
  title: string,
  description: string|null,
  dueDate: string|null,
  status: string
}

export type CreateUpdateTaskDto = Exclude<TaskDto, 'id'>