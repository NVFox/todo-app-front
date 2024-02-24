import axios from "@/config/axios";
import { PageRequestDto } from "@/dto/page.dto";
import { Task } from "@/entities/task.entity";

export class TaskService {
  async getAllTasks(pageRequest?: PageRequestDto): Promise<Task[]> {
    const response = await axios.get<Task[]>('/tasks', {
      params: pageRequest
    });
    return response.data;
  }

  async getTask(id: number): Promise<Task> {
    const response = await axios.get<Task>(`/tasks/${id}`);
    return response.data;
  }
}