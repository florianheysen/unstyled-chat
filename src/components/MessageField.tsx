"use client";

import axios from "axios";
import { FC, useState } from "react";

interface MessageFieldProps {
  isFetching: boolean;
  roomId: string;
}

const MessageField: FC<MessageFieldProps> = ({ roomId, isFetching }) => {
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("");

  const sendMessage = async (text: string) => {
    setIsSending(true);
    await axios.post("/api/message", { text, roomId });
    setText("");
    setIsSending(false);
  };

  return (
    <div className="flex gap-2">
      type a new message:
      <input
        disabled={isSending}
        onChange={({ target }) => setText(target.value)}
        className="border border-zinc-300"
        type="text"
        value={text}
      />
      <button disabled={isFetching} onClick={() => sendMessage(text)}>
        send
      </button>
    </div>
  );
};

export default MessageField;
