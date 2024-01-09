"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastSuccess } from "@/utils/toast/ToastSuccess";
import { ToastError } from "@/utils/toast/ToastError";
import { IconEmail, IconPassword } from "@/utils/icons";
import { CustomInput } from "@/components/CustomInput";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("fetch login: ", res);

      if (res.error === null) {
        router.push("/profile");
        ToastSuccess("Sesión iniciada!");
      } else {
        ToastError(res.error);
      }
    } catch (error) {
      // console.error('Error al iniciar sesión:', error)
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <CustomInput
        label={"Email"}
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<IconEmail />}
        placeholder={"Introduzca su email"}
      />

      <CustomInput
        label={"Password"}
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<IconPassword />}
        placeholder={"Introduzca su password"}
      />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
