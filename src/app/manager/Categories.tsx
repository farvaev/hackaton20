"use client";

import { TCategory, useCategories, useReports, useSaveComment } from "@/api";
import Input from "@/ui/Input";
import { useState } from "react";

export function Categories() {
  const { data: categories } = useCategories();

  return (
    <>
      {categories &&
        categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
    </>
  );
}

const Category = ({ category }: { category: TCategory }) => {
  const { data: reportsData } = useReports(category.id);

  const {
    mutateAsync: saveComment,
    isPending,
    error,
    isSuccess,
  } = useSaveComment();

  return (
    <div key={`${category.id}-${category.name}`} className="flex flex-col">
      <div className="p-2 flex justify-center align-center bg-gray-100">
        <span>{category.name}</span>
      </div>
      <div className="p-4 gap-4 flex flex-col items-stretch">
        {reportsData &&
          reportsData.pages.map((page) => {
            return page.map((report) => (
              <div key={`${report.id}-${report.user_id}`} className="p-2">
                {report.log}
              </div>
            ));
          })}
        <form
          className="flex items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = new FormData(form);
            const text = data.get("text") as string;

            saveComment({
              text: text,
              category_id: category.id,
            });
          }}
        >
          <Input
            name="text"
            className="grow"
            placeholder="Оставить комментарий"
            disabled={isPending}
          />
          <button
            className="disabled:animate-pulse disabled:opacity-70 cursor-pointer border-2 p-2 w-fit border-black"
            type="submit"
            disabled={isPending}
          >
            Сохранить
          </button>
        </form>
        {error ? (
          <div className="text-xs text-Red py-1">{JSON.stringify(error)}</div>
        ) : null}
        <div className="border cursor-pointer w-fit p-2 bg-Green white text-white">
          Исправлено
        </div>
      </div>
    </div>
  );
};
