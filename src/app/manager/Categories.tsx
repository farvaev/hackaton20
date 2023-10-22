"use client";

import { useCategories, useReports } from "@/api";
import Input from "@/ui/Input";

export function Categories() {
  const { data: categories } = useCategories();
  const { mutate: getReports, data: reports } = useReports();

  return (
    <>
      {categories &&
        categories.map((category) => (
          <div
            key={`${category.id}-${category.name}`}
            className="flex flex-col mb-4"
          >
            <div
              className="p-2 flex justify-center align-center cursor-pointer bg-gray-100"
              onClick={() => getReports({ category: category.id })}
            >
              <span>{category.name}</span>
            </div>
            {reports &&
              reports.map((report) => (
                <div key={`${report.id}-${report.user_id}`} className="p-2">
                  {report.log}
                </div>
              ))}
            <Input placeholder="Оставить комментарий" />
          </div>
        ))}
    </>
  );
}
