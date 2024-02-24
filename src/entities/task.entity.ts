export type Task = {
  id: number,
  title: string,
  description: string|null,
  dueDate: Date,
  status: TaskStatus
}

export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}