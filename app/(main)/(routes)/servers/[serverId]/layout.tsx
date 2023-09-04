import prisma from "@/lib/prismadb";

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

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
