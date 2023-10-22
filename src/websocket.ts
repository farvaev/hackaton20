// use only in "use client" components
// subscribe in useEffect and returned unsubscribe in useEffect cleanup

import { useEffect, useRef } from "react";
import { apiWsUrl } from "../config";

const ws =
  typeof window !== "undefined"
    ? new WebSocket("ws://localhost:3000/api/user/subscribe")
    : null;

const handler = (e: MessageEvent<string>) => {
  console.log(e);
  handlers.forEach((handler) => {
    handler(e.data);
  });
};
ws?.addEventListener("message", handler);

type TWsMessageHandler = (message: string) => void;
const handlers: TWsMessageHandler[] = [];

/**
 * @returns () => void // unsubscribe function
 */
export function subscribe({ onMessage }: { onMessage: TWsMessageHandler }) {
  handlers.push(onMessage);

  return () => {
    const index = handlers.indexOf(onMessage);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  };
}

export function send(msg: string) {
  ws?.send(msg);
}

export function useWebsocket(handler: TWsMessageHandler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const onMessage: TWsMessageHandler = (e) => {
      handlerRef.current(e);
    };
    const unsub = subscribe({ onMessage });

    return () => {
      unsub();
    };
  }, []);
}
