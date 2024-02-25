import { Task, TaskStatus } from "@/entities/task.entity";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/services/task.service";
import { TaskMapper } from "@/mappers/task.mapper";
import { Page, PageRequestDto } from "@/dto/page.dto";

const taskMapper = new TaskMapper();
const taskService = new TaskService(taskMapper);

export const useAllTasks = (pageRequest?: PageRequestDto) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => taskService.getAllTasks(pageRequest)
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskService.createTask(taskMapper.taskToCreateUpdateDto(task)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskService.updateTask(task.id ?? 0, taskMapper.taskToCreateUpdateDto(task)),
    onSuccess: (data, task) => {
      queryClient.setQueryData(["todos"], (old: Task[] | Page<Task>) => {
        return old.map(item => {
          return item.id === task.id ? data : item;
        })
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}

export const useTask = (
  task: Task = {
    id: 0,
    title: "",
    description: "",
    dueDate: null,
    status: TaskStatus.PENDING
  }
) => {
  return useState(task);
}

export const useTasks = () => {
  return {
    useAllTasks,
    useTask
  }
}