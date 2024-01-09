"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function MenuAccount() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-full flex items-center">
      <div
        className="w-12 h-12  rounded-full overflow-hidden border-2 border-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={session?.user?.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {isOpen && (
        <div className="absolute top-20 right-0">
          <div className="bg-white rounded overflow-hidden shadow-lg">
            <div className="text-center p-6  border-b">
              <p className="pt-2 text-lg font-semibold">
                {session?.user?.name}
              </p>
              <p className="text-sm text-gray-600">{session?.user?.email}</p>
              <div className="mt-5">
                <Link
                  href="/profile"
                  className="inline-block border rounded-full py-2 px-4 text-xs font-semibold text-gray-700"
                >
                  Administrar perfil
                </Link>
              </div>
            </div>

            <div className="">
              <Link href="#" className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
                <p className="text-sm font-medium text-gray-800 leading-none">
                  Sus mascotas
                </p>
              </Link>
              <Link href="#" className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
                <p className="text-sm font-medium text-gray-800 leading-none">
                  Soporte
                </p>
              </Link>
              <button
                className="px-4 py-2 pb-4 hover:bg-gray-100 flex"
                onClick={async () => await signOut()}
              >
                <p className="text-sm font-medium text-gray-800 leading-none">
                  Cerrar sesión
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
