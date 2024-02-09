"use client";
import { pusherClient } from "@/lib/pusher";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";

interface MessagesProps {
  initialMessages?: {
    text: string;
    id: string;
  }[];
  roomId: string;
  refetch: () => void;
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId, refetch }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", () => {
      console.log("incoming-message recieved");

      queryClient.invalidateQueries({
        queryKey: ["room", roomId],
      });

      refetch();
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
