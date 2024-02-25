import { Task } from "@/entities/task.entity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/services/task.service";
import { TaskMapper } from "@/mappers/task.mapper";
import { Page, PageRequestDto } from "@/dto/page.dto";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  return useMutation({
    mutationFn: (task: Task) => taskService.createTask(taskMapper.taskToCreateUpdateDto(task)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
    onSettled: (_data, error) => {
      const { dismiss } = toast({
        variant: error ? "destructive": "default",
        title: error ? error.message : "La tarea se ha creado con éxito.",
        description: error ? "Algo salió mal." : "Ya puedes visualizarla en el menú principal"
      })

      const timeoutId = setTimeout(() => {
        dismiss()
      }, 100)

      clearTimeout(timeoutId);
    }
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (task: Task) => taskService.updateTask(task.id ?? 0, taskMapper.taskToCreateUpdateDto(task)),
    onSuccess: (data, task) => {
      queryClient.setQueryData(["todos"], (old: Task[] | Page<Task>) => {
        return old.map(item => {
          return item.id === task.id ? data : item;
        })
      })
    },
    onSettled: (_data, error) => {
      const { dismiss } = toast({
        variant: error ? "destructive": "default",
        title: error ? error.message : "La tarea se ha actualizado con éxito.",
        description: error ? "Algo salió mal." : "Ya puedes visualizarla en el menú principal"
      })

      const timeoutId = setTimeout(() => {
        dismiss()
      }, 100)

      clearTimeout(timeoutId);

      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["todos"], (old: Task[] | Page<Task>) => {
        return old.filter(item => item.id === id)
      })
    },
    onSettled: (_data, error) => {
      const { dismiss } = toast({
        variant: error ? "destructive": "default",
        title: error ? error.message : "La tarea se ha eliminado con éxito.",
        description: error ? "Algo salió mal." : "Ya puedes visualizar este cambio en el menú principal"
      })

      const timeoutId = setTimeout(() => {
        dismiss()
      }, 100)

      clearTimeout(timeoutId);

      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}