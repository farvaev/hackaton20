import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type TReport = {
  report_id: string;
  log: string;
  created_at: Date | string;
};

export function sendErrorOriginal(report: TReport) {
  return axios.post("/api/user/report", report);
}
export function useSendReport() {
  return useMutation<{ message: string }, unknown, TReport>({
    mutationFn: (report) => {
      return sendErrorOriginal(report).then((res) => res.data);
    },
  });
}

type TRegisterBody = { login: string; password: string };
export function register(data: TRegisterBody) {
  return axios.post("/api/user", data);
}
export function useRegister() {
  return useMutation<void, unknown, TRegisterBody>({
    mutationFn: (data) => {
      return register(data).then((res) => res.data);
    },
  });
}
