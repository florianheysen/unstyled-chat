import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const roomMessages = await db.message.findMany({
      where: {
        chatRoomId: params.roomId,
      },
    });

    return NextResponse.json(roomMessages);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
