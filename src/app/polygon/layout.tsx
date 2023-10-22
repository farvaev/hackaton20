"use client";

import { useCurrentUser } from "@/api";
import { useWebsocket } from "@/websocket";
import toast from "react-hot-toast";

export default function PolygonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();

  useWebsocket((msg) => {
    toast(
      (t) => {
        return (
          <div>
            {msg}
            <button
              className="p-1 leading-none translate-x-2 text-lg inline-block cursor-pointer text-Gray hover:text-Black"
              onClick={() => toast.dismiss(t.id)}
            >
              <span>×</span>
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
      <header className="shadow-md">
        <div className="max-w-3xl m-auto flex justify-between p-2">
          <div />
          <div>
            {isLoading
              ? "..."
              : user?.name || (
                  <span className="italic text-Gray">Без имени</span>
                )}
          </div>
        </div>
      </header>
      {/* <div className="px-2 py-1">
        <Nav />
      </div> */}
      <div className="px-2 py-1 max-w-3xl m-auto">{children}</div>
    </div>
  );
}
