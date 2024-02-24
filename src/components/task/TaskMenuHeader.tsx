import { InfoIcon } from "lucide-react";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function TaskMenuHeader() {
  return (
    <header className="flex h-16 items-center px-4 shadow-md">
      <section className="flex justify-between gap-16">
        <article className="flex items-center space-x-4">
          <InfoIcon />
          <h2 className="text-xl font-bold">Todo List</h2>
        </article>
        <NavigationMenu>
          <NavigationMenuList>
            <a href="/tasks">
              <NavigationMenuLink className={ navigationMenuTriggerStyle() } >
                Mis tareas
              </NavigationMenuLink>
            </a>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      <article className="flex justify-end flex-1">
        <Avatar>
          <AvatarImage src=""></AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </article>
    </header>
  )
}