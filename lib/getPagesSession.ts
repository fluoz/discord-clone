import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getPagesSession(req: any, res: any) {
  return await getServerSession(req, res, authOptions);
}
