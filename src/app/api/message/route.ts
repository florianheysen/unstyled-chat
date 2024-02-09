import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { text, roomId } = await req.json();

  await db.message.create({
    data: {
      text,
      chatRoomId: roomId,
    },
  });

  await pusherServer.trigger(roomId, "incoming-message", null);
  console.log("incoming-message sent");

  return new Response(JSON.stringify({ success: true }));
}
