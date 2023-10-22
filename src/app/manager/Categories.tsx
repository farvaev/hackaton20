"use client";

import { TCategory, useCategories, useReports, useSaveComment } from "@/api";
import Input from "@/ui/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Categories() {
  const { data: categories } = useCategories();

  useEffect(() => {
    if (!categories) return;
    setCategoryId(categories[0]?.id || null);
  }, [categories]);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  const category = categories?.find((c) => c.id === categoryId);

  return (
    <>
      <div className="grid grid-cols-3 gap-2 px-2 py-3 rounded-md my-2 bg-slate-100 max-h-[512px] min-h-[320px]">
        <div className="pr-2 border-r border-solid border-slate-300">
          <ul className="flex flex-col items-stretch gap-1 text-slate-700">
            {categories?.map((category) => {
              const selectedClass =
                category.id === categoryId
                  ? "text-MainBlue bg-MainBlue/20"
                  : "hover:bg-slate-200";

              return (
                <li key={category.id}>
                  <button
                    onClick={() => setCategoryId(category.id)}
                    className={`py-1 px-2 block w-full text-left rounded-md ${selectedClass}`}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-2 flex items-stretch">
          {category ? <Category category={category} /> : null}
        </div>
      </div>
    </>
  );
}

const Category = ({ category }: { category: TCategory }) => {
  const {
    data: reportsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useReports(category.id);

  const { mutateAsync: saveComment, isPending, error } = useSaveComment();

  const len = reportsData?.pages.reduce((length, page) => {
    return length + page.length;
  }, 0);

  return (
    <div
      key={`${category.id}-${category.name}`}
      className="flex flex-col justify-between w-full"
    >
      <div>
        <div className="p-2 text-center font-semibold">
          <span>{category.name}</span>
        </div>
        <div className="py-2 gap-1 flex flex-col items-stretch">
          {!len && !isLoading ? (
            <div className="text-slate-500 text-sm">Нет ошибок</div>
          ) : null}
          {reportsData &&
            reportsData.pages.map((page) => {
              return page.map((report) => (
                <div
                  key={`${report.id}-${report.user_id}`}
                  className="p-2 text-sm text-Red bg-red-200 rounded-sm"
                >
                  {report.log}
                </div>
              ));
            })}
          {hasNextPage ? (
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage || isFetching}
                className="text-xs underline text-MainBlue hover:decoration-transparent cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
              >
                Ещё ошибки
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <form
          className="flex items-stretch gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = new FormData(form);
            const text = data.get("text") as string;

            saveComment({
              text: text,
              category_id: category.id,
            }).then(() => {
              toast.success("Коммент сохранён");
            });
          }}
        >
          <Input
            name="text"
            className="grow"
            placeholder="Комментарий"
            disabled={isPending}
          />
          <button
            className="disabled:pointer-events-none disabled:animate-pulse disabled:opacity-70 cursor-pointer py-1 px-2 text-white bg-MainBlue rounded-md"
            type="submit"
            disabled={isPending}
          >
            Сохранить
          </button>
        </form>
        {error ? (
          <div className="text-xs text-Red py-1">{JSON.stringify(error)}</div>
        ) : null}
        <div className="mt-2">
          <label className="inline-flex items-center gap-1">
            <input
              className=""
              type="checkbox"
              defaultChecked={false}
              onChange={(e) => {
                const input = e.target as HTMLInputElement;

                if (input.checked) {
                  // send request
                }
              }}
            />{" "}
            Исправлено
          </label>
        </div>
      </div>
    </div>
  );
};
