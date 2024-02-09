"use client";

import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { Message } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";

interface PageProps {
  params: {
    roomId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { roomId } = params;
  const [sendingMessage, setSendingMessage] = useState<string | null>(null);

  const {
    data: initialMessages,
    isFetching,
    refetch,
  } = useQuery<Message[]>({
    queryKey: ["room", roomId],
    queryFn: () => fetcher(`/api/roomMessages/${roomId}`),
  });

  const serializedMessages = initialMessages?.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <div>
      <p>messages:</p>
      <Messages
        roomId={roomId}
        refetch={refetch}
        isFetching={isFetching}
        messages={serializedMessages}
        sendingMessage={sendingMessage}
      />
      <MessageField
        roomId={roomId}
        setSendingMessage={setSendingMessage}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Page;
