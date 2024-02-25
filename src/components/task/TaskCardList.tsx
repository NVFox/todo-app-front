import { Page } from "@/dto/page.dto"
import { Task } from "@/entities/task.entity"
import { TaskCard } from "./TaskCard"
import { Fragment, useMemo } from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { TaskCardSkeleton } from "./loading/TaskCardSkeleton"
import { NotFoundTasks } from "./loading/NotFoundTasks"

export type TaskCardListProps = {
  paginated: boolean,
  loading: boolean,
  tasks: Task[] | Page<Task>
}

export function TaskCardList({ paginated = false, loading = false, tasks }: TaskCardListProps) {
  const taskList = useMemo(() => {
    return tasks instanceof Page 
          ? tasks.content
          : tasks;
  }, [tasks]);

  const taskPage = useMemo(() => {
    return tasks as Page<Task>; 
  }, [tasks])

  const showControls = useMemo(() => {
    if (!taskPage?.content) return false;

    return paginated && taskPage.content.length > 0;
  }, [taskPage, paginated])

  const pageNumbers = useMemo(() => {
    const pageNumber = taskPage.number + 1;
    const { totalPages } = taskPage;

    if (taskPage.first) {
      return [1, 2, 3]
        .filter(number => number <= totalPages);
    }

    if (taskPage.last) {
      return [2, 1, 0]
        .map(number => totalPages - number)
        .filter(number => number >= 1)
    }

    return [-1, 0, 1]
      .map(number => pageNumber + number)
      .filter(number => number >= 1 && number <= totalPages);
  }, [taskPage])

  return (
    <section className="flex flex-col gap-4">
      { 
        loading 
          ? (
            Array.from(Array(4), (_, i) => i + 1).map(num => (
              <TaskCardSkeleton key={"skeleton-" + num} />
            ))
          ) 
          : taskList.length > 0 
            ? taskList.map(task => (
              <TaskCard key={task.id} task={task} />
            )) : <NotFoundTasks />
      }
      {
        showControls
          ? (
            <Pagination>
              <PaginationContent>
                <PaginationItem >
                  <PaginationPrevious href={taskPage.first ? undefined : `/${taskPage.number}`} isActive={!taskPage.first} />
                </PaginationItem>
                {
                  pageNumbers.map((number) => (
                    <Fragment key={'link-' + number}>
                      { 
                        number <= taskPage.number - 1
                          ? (
                            <PaginationItem key={'less'}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : <></>
                      }
                      <PaginationItem>
                        <PaginationLink href={number === taskPage.number + 1 ? undefined : `/${number}`} isActive>{ number }</PaginationLink>
                      </PaginationItem>
                      { 
                        number >= taskPage.number + 3
                          ? (
                            <PaginationItem key={'more'}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : <></>
                      }
                    </Fragment>
                  ))
                }
                <PaginationItem>
                  <PaginationNext href={taskPage.last ? undefined : `/${taskPage.number + 2}`} isActive={!taskPage.last} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) 
          : <></>
      }
    </section>
  )
}