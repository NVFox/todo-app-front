import axios from "@/config/axios";
import { Page, PageRequestDto, PageResponseDto } from "@/dto/page.dto";
import { CreateUpdateTaskDto, TaskDto } from "@/dto/task.dto";
import { Task } from "@/entities/task.entity";
import { TaskMapper } from "@/mappers/task.mapper";

export class TaskService {
  constructor(
    private taskMapper: TaskMapper
  ) {}

  async getAllTasks(pageRequest?: PageRequestDto): Promise<Task[]|Page<Task>> {
    const response = await axios.get<TaskDto[]|PageResponseDto<TaskDto>>('/tasks', {
      params: pageRequest
    });

    if (pageRequest) {
      return this.taskMapper.dtoPageToTaskPage(
        new Page(response.data as PageResponseDto<TaskDto>)
      );
    }

    return this.taskMapper.dtoListToTaskList(response.data as TaskDto[]);
  }

  async getTask(id: number): Promise<Task> {
    const response = await axios.get<TaskDto>(`/tasks/${id}`);
    return this.taskMapper.dtoToTask(response.data);
  }

  async createTask(task: CreateUpdateTaskDto): Promise<Task> {
    const response = await axios.post<TaskDto>('/tasks', task);
    return this.taskMapper.dtoToTask(response.data);
  }

  async updateTask(id: number, task: CreateUpdateTaskDto): Promise<Task> {
    const response = await axios.put<TaskDto>(`/tasks/${id}`, task);
    return this.taskMapper.dtoToTask(response.data);
  }

  async deleteTask(id: number) {
    await axios.delete(`/tasks/${id}`);
  }
}