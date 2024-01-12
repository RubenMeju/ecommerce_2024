"use client";
import { CustomInput } from "@/components/CustomInput";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log(session);

  const [name, setName] = useState(session?.user?.name);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("session user", session?.user);
    const body = session?.user;
    const res = await fetch(`/api/auth/update_profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
  return (
    <form className="space-y-4" onSubmit={handleUpdateProfile}>
      <CustomInput
        label={"Nombre"}
        type={"text"}
        // value={name}
        onChange={(e) => setName(e.target.value)}
        //icon={<IconEmail />}
        placeholder={session?.user?.name}
      />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
}

/*
   <div>
      <img src={session?.user?.image} alt={session?.user?.name} />
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
*/
