import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();

const handleAuth = async () => {
  const currentUser = await getServerSession(authOptions);

  if (!currentUser?.user) {
    throw new Error("unauthorized");
  }

  return {
    email: currentUser.user.email,
  };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
