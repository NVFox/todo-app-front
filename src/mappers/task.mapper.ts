import { Page } from "@/dto/page.dto";
import { TaskDto } from "@/dto/task.dto";
import { Task, TaskStatus } from "@/entities/task.entity";
import { dateFromFormat } from "@/utils";

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

  dtoPageToTaskPage(page: Page<TaskDto>) {
    return page.map<Task>(dto => this.dtoToTask(dto));
  }
}