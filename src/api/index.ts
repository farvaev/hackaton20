import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export type TReport = {
  report_id: string;
  log: string;
  created_date: string;
  created_at: string;
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

// categories
export type TCategory = {
  id: number;
  name: string;
  count: number;
};
export type TCategoriesResponse = {
  categories: Array<TCategory>;
};
export function getCategories() {
  return axios
    .get<TCategoriesResponse>("/api/manager/categories")
    .then((res) => res.data.categories);
}
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}

// reports
export type TResponseReport = {
  category: string;
  create_date: string;
  id: string;
  log: string;
  user_id: number;
};
export type TReportsBody = { category: number };
export type TReportsResponse = Array<TResponseReport>;
const getReports = (data: TReportsBody) =>
  axios.post("/api/manager/reports", data).then((res) => res.data.reports);
export function useReports() {
  return useMutation<TReportsResponse, unknown, TReportsBody>({
    mutationFn: (data) => {
      return getReports(data);
    },
  });
}

type TUser = { name: string; id: string };
export function getCurrentUser() {
  return axios.get("/api/user/me");
}
export function useCurrentUser() {
  return useQuery<TUser>({
    queryKey: ["users", "current"],
    queryFn: () => {
      return getCurrentUser().then((res) => res.data);
    },
  });
}

type TSaveCommentBody = { category_id: number; text: string };
const saveComment = (data: TSaveCommentBody) =>
  axios.post("/api/manager/category/comment", data);
export function useSaveComment() {
  return useMutation<void, unknown, TSaveCommentBody>({
    mutationFn: (data) => {
      return saveComment(data).then((res) => res.data);
    },
  });
}
