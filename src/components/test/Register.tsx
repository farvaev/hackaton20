"use client";

import Input from "@/ui/Input";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState<any>("");

  const register = (data: { login: string; password: string }) => {
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setData(JSON.stringify(res.json()));
        } else {
          setData(JSON.stringify({ message: "api not working" }));
        }
      })
      .catch((e) => {
        setData(JSON.stringify({ message: "some error" }));
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target as HTMLFormElement);
          const login = data.get("login");
          const password = data.get("password");
          if (!login || !password) return;
          register({
            login: login as string,
            password: password as string,
          });
        }}
      >
        <div className="inline-flex flex-col gap-2 p-2">
          <div>
            <Input name="login" placeholder="login" />
          </div>
          <div>
            <Input name="password" placeholder="password" />
          </div>
          <button type="submit" className="rounded-sm bg-Green p-2 text-white">
            register
          </button>
        </div>
      </form>
      <div className="p-2">Response: {data}</div>
    </div>
  );
}
