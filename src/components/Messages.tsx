"use client";
import { pusherClient } from "@/lib/pusher";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";

interface MessagesProps {
  isFetching: boolean;
  initialMessages?: {
    text: string;
    id: string;
  }[];
  roomId: string;
}

const Messages: FC<MessagesProps> = ({
  isFetching,
  initialMessages,
  roomId,
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", () => {
      queryClient.invalidateQueries({
        queryKey: ["room", roomId],
      });
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  if (!initialMessages) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {initialMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
    </div>
  );
};

export default Messages;
