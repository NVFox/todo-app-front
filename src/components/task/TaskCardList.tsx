import { ReactNode } from "react"

export type TaskCardListProps = {
  children: ReactNode
}

export function TaskCardList({ children }: TaskCardListProps) {
  return (
    <section className="flex flex-col gap-4">
      { children }
    </section>
  )
}