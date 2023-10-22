"use client";

import { useCurrentUser } from "@/api";

export default function PolygonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();

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
