import { useSendReport } from "@/api";
import { generateReport } from "@/api/mocks";
import { ReportSender } from "./ReportSender";

export default function PolygonLayout() {
  return (
    <div>
      <ReportSender />
    </div>
  );
}
