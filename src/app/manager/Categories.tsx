"use client";

import { useCategories, useReports, useSaveComment } from "@/api";
import Input from "@/ui/Input";
import { useState } from "react";

export function Categories() {
  const { data: categories } = useCategories();
  const { mutate: getReports, data: reports } = useReports();

  const [text, setText] = useState<string>("")
  const { mutate: saveComment } = useSaveComment();

  return (
    <>
      {categories &&
        categories.map((category) => (
          <div
            key={`${category.id}-${category.name}`}
            className="flex flex-col"
          >
            <div
              className="p-2 flex justify-center align-center cursor-pointer bg-gray-100"
              onClick={() => getReports({ category: category.id })}
            >
              <span>{category.name}</span>
            </div>
            <div className="p-4 gap-4 flex flex-col items-stretch">
              {
                reports && reports.map((report) => (
                  <div key={`${report.id}-${report.user_id}`} className="p-2">
                    {report.log}
                  </div>
                ))
              }
              <Input placeholder="Оставить комментарий" onChange={(e) => setText(e.target.value)} />
              <div className="cursor-pointer border-2 p-2 w-fit border-black" onClick={() => saveComment({
                text: text,
                category_id: category.id
              })}>Сохранить</div>
              <div className="border cursor-pointer w-fit p-2 bg-Green white text-white">Исправлено</div>
            </div>
          </div>
        ))}
    </>
  );
}
