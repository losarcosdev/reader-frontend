import { buttonVariants } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignUp } from "./components";
import { ChevronLeft } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20 flex gap-2 items-center"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Home
        </Link>
        <SignUp />
      </div>
    </div>
  );
};

export default SignInPage;
