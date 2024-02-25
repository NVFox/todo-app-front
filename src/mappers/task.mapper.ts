import { Page } from "@/dto/page.dto";
import { CreateUpdateTaskDto, TaskDto } from "@/dto/task.dto";
import { Task, TaskStatus } from "@/entities/task.entity";
import { dateFromFormat } from "@/utils";
import { format } from "date-fns";

export class TaskMapper {
  dtoToTask(dto: TaskDto): Task {
    const { dueDate, status } = dto;

    return {
      ...dto,
      dueDate: dueDate ? dateFromFormat(dueDate) : null,
      status: status as TaskStatus
    }
  }

  dtoListToTaskList(list: TaskDto[]): Task[] {
    return list.map(dto => this.dtoToTask(dto));
  }

  dtoPageToTaskPage(page: Page<TaskDto>): Page<Task> {
    return page.map<Task>(dto => this.dtoToTask(dto));
  }

  taskToCreateUpdateDto({dueDate, description, title, status}: Task): CreateUpdateTaskDto {
    return {
      title,
      status,
      dueDate: dueDate ? format(dueDate, "dd-MM-yyyy") : null,
      description: description ?? null
    }
  }
}