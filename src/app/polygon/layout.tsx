"use client";

import { useCurrentUser } from "@/api";
import { useWebsocket } from "@/websocket";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

export default function PolygonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading, error } = useCurrentUser();

  useWebsocket((msg) => {
    toast.success(
      (t) => {
        return (
          <div>
            <div
              className="break-words text-sm line-clamp-6"
              // @ts-ignore
              style={{ wordBreak: "break-word" }}
            >
              {msg}
            </div>
            <button
              className="mt-2 text-xs py-1 leading-none inline-block cursor-pointer text-Gray hover:text-Black underline hover:decoration-transparent"
              onClick={() => toast.dismiss(t.id)}
            >
              Скрыть
            </button>
          </div>
        );
      },
      {
        duration: Infinity,
      }
    );
  });

  return (
    <div>
      <header className="p-2 max-w-3xl m-auto">
        <div className="border-b border-solid border-slate-300 flex justify-between px-2 py-4">
          <div />
          <div>
            {isLoading ? (
              "..."
            ) : error ? (
              <Link href={"/"}>Войти</Link>
            ) : (
              user?.name || <span className="italic text-Gray">Без имени</span>
            )}
          </div>
        </div>
      </header>
      {/* <div className="px-2 py-1">
        <Nav />
      </div> */}
      <div className="px-2 py-4 max-w-3xl m-auto">{children}</div>
    </div>
  );
}
