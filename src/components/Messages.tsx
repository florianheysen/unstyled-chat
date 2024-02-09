"use client";

import { pusherClient } from "@/lib/pusher";
import { Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";

interface MessagesProps {
  sendingMessage: string | null;
  messages?: {
    text: string;
    id: string;
  }[];
  roomId: string;
  refetch: () => void;
  isFetching: boolean;
}

const Messages: FC<MessagesProps> = ({
  sendingMessage,
  messages,
  roomId,
  refetch,
  isFetching,
}) => {
  const queryClient = useQueryClient();
  const [incommingMessage, setIncommingMessage] = useState<Message>();

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (message: Message) => {
      queryClient.invalidateQueries({
        queryKey: ["room", roomId],
      });

      setIncommingMessage(message);

      refetch();
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  if (!messages) {
    return <div>Loading</div>;
  }

  return (
    <div className="list-disc ml-2">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
      {sendingMessage && <li className="text-blue-500">{sendingMessage}</li>}
      {isFetching && <li className="text-red-500">{incommingMessage?.text}</li>}
    </div>
  );
};

export default Messages;
