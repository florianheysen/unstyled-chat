import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { text, roomId } = await req.json();

  const message = await db.message.create({
    data: {
      text,
      chatRoomId: roomId,
    },
  });

  await pusherServer.trigger(roomId, "incoming-message", message);

  return new Response(JSON.stringify({ success: true }));
}
