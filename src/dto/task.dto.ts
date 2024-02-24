export type TaskDto = {
  id: number,
  title: string,
  description: string|null,
  dueDate: string,
  status: string
}

export type CreateTaskDto = Exclude<TaskDto, 'id'>