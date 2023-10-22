import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

if (typeof window !== undefined) {
  // @ts-ignore
  window.axios = axios;
}

type TRegisterBody = { name: string; password: string };
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
  is_done: boolean;
  comment: string;
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
export type TReportsBody = {
  category_id: number;
  limit: number;
  offset: number;
};
export type TReportsResponse = Array<TResponseReport>;
const getReports = (data: TReportsBody) =>
  axios
    .post("/api/manager/reports", { ...data })
    .then((res) => res.data.reports);
export function useGetReports() {
  return useMutation<TReportsResponse, unknown, TReportsBody>({
    mutationFn: (data) => {
      return getReports(data);
    },
  });
}
export function useReports(category: number) {
  return useInfiniteQuery<TReportsResponse, unknown>({
    queryKey: ["reports", { category }],
    queryFn: ({ pageParam }) => {
      return getReports({
        category_id: category,
        limit: 10,
        offset: pageParam as number,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (_, pages, prevParam) => {
      const count = pages.reduce((length, page) => {
        return length + page.length;
      }, 0);
      return count === prevParam ? undefined : count;
    },
  });
}

// user
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
  const client = useQueryClient();

  return useMutation<void, unknown, TSaveCommentBody>({
    mutationFn: (data) => {
      return saveComment(data).then((res) => {
        client.setQueryData<TCategoriesResponse["categories"]>(
          ["categories"],
          (old) => {
            if (!old) return old;
            return old.map((c) => {
              if (c.id === data.category_id) {
                return {
                  ...c,
                  comment: data.text,
                };
              } else {
                return c;
              }
            });
          }
        );
      });
    },
  });
}
