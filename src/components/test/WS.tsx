"use client";

import Input from "@/ui/Input";
import { subscribe } from "@/websocket";
import { useState, useRef, useEffect } from "react";

export default function WS() {
  const [messages, setMessages] = useState<string[]>([]);

  const messagesRef = useRef({
    messages,
  });
  messagesRef.current.messages = messages;

  useEffect(() => {
    const unsub = subscribe({
      onMessage: (msg) => {
        setMessages([msg, ...messagesRef.current.messages]);
      },
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-ignore
          send(e.target.elements.msg.value);
        }}
      >
        send ws message{" "}
        <div>
          <Input name="msg" />{" "}
          <button className="p-2 text-white bg-Green rounded-sm" type="submit">
            send
          </button>
        </div>
      </form>
      <div>ws messages:</div>
      <ul>
        {messages.map((msg, i) => {
          return <li key={i}> - {msg}</li>;
        })}
      </ul>
    </div>
  );
}
