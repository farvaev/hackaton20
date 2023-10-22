"use client";

import { useSendReport } from "@/api";
import { generateReport } from "@/api/mocks";
import { useWebsocket } from "@/websocket";
import { toast } from "react-hot-toast";

export function ReportSender() {
  const { mutate: send, error, isPending, data: response } = useSendReport();

  useWebsocket((msg) => {
    toast(msg);
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <button
          className="text-white bg-Red rounded-sm px-2 py-1 disabled:animate-pulse disabled:opacity-70"
          onClick={() => {
            send(generateReport());
          }}
          disabled={isPending}
        >
          Отправить ошибку
        </button>
      </div>
      <div>
        {error ? (
          <div className="rounded-sm px-2 py-1 text-Red bg-Red/20">
            Не удалось отправить отчёт:
            <br />
            {error + ""}
          </div>
        ) : null}
        {response ? (
          <div className="rounded-sm px-2 py-1 text-Red bg-Red/20">
            {response.message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
