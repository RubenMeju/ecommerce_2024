import { IconUser } from "@/utils/icons";
import Link from "next/link";

export default function ButtonLogin() {
  return (
    <Link href="/auth/login">
      <IconUser stroke={"white"} className={"w-8 h-8"} />
    </Link>
  );
}
