"use client";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <div>
        <span className=" font-bold">Nombre: </span>

        <span>{session?.user?.name}</span>
      </div>
      <div>
        <span className=" font-bold">Email: </span>

        <span>{session?.user?.email}</span>
      </div>
      <div>
        <span className=" font-bold">Tipo de cuenta: </span>

        <span>{session?.user?.role === "seller" ? "Vendedor" : "Cliente"}</span>
      </div>
    </div>
  );
}
