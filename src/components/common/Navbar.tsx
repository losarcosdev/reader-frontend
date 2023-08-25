import Link from "next/link";
import { buttonVariants } from "./Button";
import { UserAccountNav } from "./UserAccountNav";
import { Newspaper } from "lucide-react";
import { getUser } from "@/services";

export const Navbar = async () => {
  const user = await getUser();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <nav className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <a href={"/"} className="flex gap-2 items-center">
          <Newspaper />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Reader
          </p>
        </a>

        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </nav>
    </div>
  );
};
