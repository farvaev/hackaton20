"use client";

import { useSendReport } from "@/api";
import { generateReport } from "@/api/mocks";

export function ReportSender() {
  const { mutate: send, error, isPending, data: response } = useSendReport();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <button
          className="text-white hover:bg-Red/80 bg-Red rounded-md px-2 py-1 disabled:animate-pulse disabled:opacity-70 disabled:pointer-events-none"
          onClick={() => {
            send(generateReport());
          }}
          disabled={isPending}
        >
          Отправить ошибку
        </button>
      </div>
      <div className="opacity-80 text-sm">
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
