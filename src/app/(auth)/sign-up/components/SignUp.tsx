import { Icons } from "@/components/common";
import { UserAuthForm } from "../../components";
import Link from "next/link";

export const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col items-center space-y-2 text-center gap-2">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Reader account and agree to our
          User Agreement and Privacy Policy
        </p>

        <UserAuthForm className="w-full" />

        <p className="px-8 text-center text-sm text-zinc-700 flex items-center gap-4">
          Already have an account?
          <Link
            href={"/sign-in"}
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
