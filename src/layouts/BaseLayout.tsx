import { TaskMenuHeader } from "@/components/task/TaskMenuHeader";
import { ReactNode } from "react";

export type BaseLayoutProps = {
  children: ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <TaskMenuHeader />
      <main>
        { children }
      </main>
    </>
  )
}