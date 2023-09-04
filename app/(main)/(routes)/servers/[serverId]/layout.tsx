import ServerSidebar from "@/components/server/server-sidebar";
import getSession from "@/lib/getSession";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: any }) {
  const getServer = await prisma.server.findUnique({
    where: {
      id: params.serverId,
    },
  });

  return {
    title: getServer?.name,
  };
}

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const currentUser = await getSession();

  if (!currentUser) {
    redirect("/login");
  }

  const server = prisma.server.findUnique({
    where: {
      id: params?.serverId,
      members: {
        some: {
          userId: currentUser.user.userId,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden fixed md:flex h-full w-60 z-20 flex-col inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
