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

const Page = ({ params }: PageProps) => {
  const { roomId } = params;

  const {
    data: roomMessage,
    isFetching,
    refetch,
  } = useQuery<Message[]>({
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
        refetch={refetch}
        initialMessages={serializedMessages}
      />
      <MessageField roomId={roomId} isFetching={isFetching} />
    </div>
  );
};

export default Page;
