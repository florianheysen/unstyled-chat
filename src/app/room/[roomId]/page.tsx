"use client";

import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { Message } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

interface PageProps {
  params: {
    roomId: string;
  };
}

const page = ({ params }: PageProps) => {
  const { roomId } = params;

  const { data: roomMessage, isFetching } = useQuery<Message[]>({
    queryKey: ["room", roomId],
    queryFn: () => fetcher(`/api/roomMessages/${roomId}`),
  });

  const serializedMessages = roomMessage?.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <div>
      <p>messages:</p>
      <Messages
        roomId={roomId}
        initialMessages={serializedMessages}
        isFetching={isFetching}
      />
      <MessageField roomId={roomId} isFetching={isFetching} />
    </div>
  );
};

export default page;
