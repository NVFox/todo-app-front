import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskCardSkeleton() {
  return (
    <Card className="flex items-center justify-between rounded-b-sm">
      <CardHeader>
        <section className="flex gap-6 items-center">
          <article className="flex flex-col gap-2">
            <CardTitle>
              <Skeleton className="h-4 w-[200px]" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-[250px]" />
            </CardDescription>
          </article>
        </section>
      </CardHeader>
    </Card>
  )
}