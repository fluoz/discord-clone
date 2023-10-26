import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import NavigationUser from "./navigation-user";

const NavigationSidebar = async () => {
  const currentUser = await getSession();
  if (!currentUser) {
    redirect("/");
  }

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          userId: currentUser.user.userId,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#e3e5e8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div className="mb-4" key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <NavigationUser imageUrl={currentUser.user.image} />
      </div>
    </div>
  );
};

export default NavigationSidebar;
