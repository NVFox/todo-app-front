import { Page } from "@/dto/page.dto"
import { Task } from "@/entities/task.entity"
import { TaskCard } from "./TaskCard"
import { Fragment, useMemo } from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"

export type TaskCardListProps = {
  paginated: boolean,
  tasks: Task[] | Page<Task>
}

export function TaskCardList({ paginated = false, tasks }: TaskCardListProps) {
  const taskList = useMemo(() => {
    return tasks instanceof Page 
          ? tasks.content
          : tasks;
  }, [tasks]);

  const taskPage = useMemo(() => {
    return tasks as Page<Task>; 
  }, [tasks])

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
        taskList.map(task => (
          <TaskCard key={task.id} task={task} />
        ))
      }
      {
        paginated 
          ? (
            <Pagination>
              <PaginationContent>
                <PaginationItem >
                  <PaginationPrevious isActive={!taskPage.first} />
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
                        <PaginationLink href={number === taskPage.number + 1 ? '#' : `/${number}`} isActive>{ number }</PaginationLink>
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
                  <PaginationNext href="" isActive={!taskPage.last} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) 
          : <></>
      }
    </section>
  )
}