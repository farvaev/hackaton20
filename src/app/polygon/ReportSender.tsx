"use client";

import { useSendReport } from "@/api";
import { generateReport } from "@/api/mocks";

export function ReportSender() {
  const { mutate: send, error, isPending, data: response } = useSendReport();

  return (
    <div className="p-2">
      <button
        className="text-lg text-white bg-Red rounded-md px-2 py-1 disabled:animate-pulse disabled:opacity-70"
        onClick={() => {
          send(generateReport());
        }}
        disabled={isPending}
      >
        Отправить ошибку
      </button>
      {error ? (
        <div className="p-2 text-Red bg-Red/20">
          Не удалось отправить отчёт:
          <br />
          {error + ""}
        </div>
      ) : null}
      {response ? (
        <div className="p-2 text-Red bg-Red/20">{response.message}</div>
      ) : null}
    </div>
  );
}
