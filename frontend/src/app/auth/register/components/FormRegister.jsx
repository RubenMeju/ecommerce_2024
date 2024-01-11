"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastError } from "@/utils/toast/ToastError";
import { ToastSuccess } from "@/utils/toast/ToastSuccess";
import { IconEmail, IconPassword, IconUser } from "@/utils/icons";
import { CustomInput } from "@/components/CustomInput";

export default function FormRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [role, setRole] = useState("Customer");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit", role);
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          re_password: repassword,
          role,
        }),
      });
      const respuesta = await res.json();
      console.log("respuesta", respuesta);
      if (!res.ok) {
        if (respuesta.email) {
          ToastError("El email ya existe!!!");
        }
        if (respuesta.password) {
          console.log("dentro de password");
          ToastError(respuesta.password[0]);
        }
        if (respuesta.non_field_errors) {
          ToastError(respuesta.non_field_errors[0]);
        }

        return null;
      }
      ToastSuccess("Cuenta registrada con exito!");
      router.push("/auth/login");
    } catch (error) {}
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <CustomInput
        label={"Username"}
        type={"username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon={<IconUser stroke={"black"} />}
        placeholder={"Introduzca su nombre"}
      />

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
      <CustomInput
        label={"Confirma password"}
        type={"password"}
        value={repassword}
        onChange={(e) => setRePassword(e.target.value)}
        icon={<IconPassword />}
        placeholder={"Confirmar password"}
      />

      <div>
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Rol de su cuenta
        </label>
        <select
          id="role"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue="Customer" // Asegúrate de que el valor coincida con alguna de las opciones
          onChange={(e) => setRole(e.target.value)}
        >
          <option disabled>Elija su role</option>
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}
