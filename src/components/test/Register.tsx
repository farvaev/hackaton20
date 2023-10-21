"use client";

import { useRegister } from "@/api";
import Input from "@/ui/Input";
import { useRouter } from "next/navigation";

export default function Register() {
  const { mutateAsync: register, isPending, isSuccess, error } = useRegister();
  const router = useRouter();

  return (
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
        }).then(() => {
          router.replace("/polygon");
        });
      }}
      className="max-w-xs m-auto my-4"
    >
      <div className="flex flex-col gap-2 p-2 items-stretch">
        <Input name="login" placeholder="login" />
        <Input name="password" placeholder="password" />
        <button
          type="submit"
          className="rounded-sm bg-Green p-2 text-white hover:bg-Green/70 disabled:animate-pulse disabled:opacity-70"
          disabled={isPending || isSuccess}
        >
          Войти
        </button>
      </div>

      <div className="h-2" />

      {error ? (
        <div className="p-2 text-Red bg-Red/20 rounded-sm">
          Ошибка регистрации:
          <br />
          {error + ""}
        </div>
      ) : null}
    </form>
  );
}
