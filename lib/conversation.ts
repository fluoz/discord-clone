import prisma from "./prismadb";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConversations(memberOneId, memberTwoId)) ||
    (await findConversations(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createConversations(memberOneId, memberTwoId);
  }
  return conversation;
};

const findConversations = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            memberOneId: memberOneId,
          },
          {
            memberTwoId: memberTwoId,
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch (err) {
    console.log("find err", err);
    return null;
  }
};

const createConversations = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await prisma.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch (err) {
    console.log("create err", err);

    return null;
  }
};
