import React from "react";
import Link from "next/link";
import FormRegister from "./components/FormRegister";

export default function RegisterPage() {
  return (
    <div className=" w-full h-[calc(100vh_-_5rem)] max-w-xs lg:max-w-md m-auto flex justify-center items-center">
      <div className="w-[50%] max-w-sm flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-50 rounded-lg">
        <h2 className=" text-center text-2xl font-bold  text-blue-700">
          Registre una cuenta
        </h2>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormRegister />
        </div>
        <p className="py-2 text-sm font-light text-gray-500">
          ¿Yá está registrado?
          <Link
            href="/auth/login"
            className="font-medium  hover:underline text-indigo-600 hover:text-indigo-500"
          >
            Inicie sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
