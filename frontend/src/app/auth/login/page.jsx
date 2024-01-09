import React from "react";
import FormLogin from "./components/FormLogin";
import Link from "next/link";
import ButtonGoogle from "./components/ButtonGoogle";

export default function Login() {
  return (
    <div className=" w-full h-[calc(100vh_-_5rem)] max-w-xs lg:max-w-md m-auto flex justify-center items-center">
      <div className="w-[50%] max-w-sm flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-50 rounded-lg">
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-blue-700">
          Iniciar sesión
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormLogin />
        </div>

        <ButtonGoogle />
        <p className="py-2 text-sm font-light text-gray-900 ">
          ¿Crear una cuenta?
          <Link
            href="/auth/register"
            className="ml-2 font-medium  hover:underline text-indigo-600 hover:text-indigo-500"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}
