"use server";

import { db } from "@/lib/db";

export const getMessages = async (roomId: string) => {
  const res = await db.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });

  return res;
};
