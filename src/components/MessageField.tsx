"use client";

import axios from "axios";
import { FC, useState } from "react";

interface MessageFieldProps {
  isFetching: boolean;
  roomId: string;
  setSendingMessage: any;
}

const MessageField: FC<MessageFieldProps> = ({
  roomId,
  isFetching,
  setSendingMessage,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("");

  const sendMessage = async (text: string) => {
    setSendingMessage(text);
    setIsSending(true);
    await axios.post("/api/message", { text, roomId });
    setText("");
    setIsSending(false);
    setSendingMessage(null);
  };

  return (
    <div className="flex gap-2 my-2">
      <input
        disabled={isSending}
        onChange={({ target }) => setText(target.value)}
        className="border border-zinc-300"
        type="text"
        value={text}
      />
      <button
        disabled={isSending || isFetching}
        onClick={() => sendMessage(text)}
      >
        send
      </button>
    </div>
  );
};

export default MessageField;
