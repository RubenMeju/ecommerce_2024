"use client";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <div>
      profile
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </div>
  );
}
