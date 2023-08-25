import { buttonVariants } from "@/components/common";
import { Session } from "@/interfaces";
import { BookOpen, Users } from "lucide-react";
import Link from "next/link";

interface Props {
  user: Session | null;
}

export const FeedCards = ({ user }: Props) => {
  return (
    <>
      <div className="overflow-hidden h-fit rounded-lg border border-gray-200 w-full">
        <div className="bg-orange-200 px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            Communities
          </p>
        </div>
        <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <p className="text-zinc-500">
              Create a new one or come here to check in with your favorite
              communities
            </p>
          </div>
          {user ? (
            <a
              href="/c/create"
              className={buttonVariants({
                className: "w-full mb-3",
              })}
            >
              Create community
            </a>
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({
                className: "w-full mb-3",
              })}
            >
              Create community
            </Link>
          )}
          <a
            href="/c"
            className={buttonVariants({
              className: "w-full mb-3",
              variant: "subtle",
            })}
          >
            Browse communities
          </a>
        </div>
      </div>
      <div className="overflow-hidden h-fit rounded-lg border border-gray-200 w-full">
        <div className="bg-blue-200 px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Posts
          </p>
        </div>
        <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <p className="text-zinc-500">
              Create a new post or come here to discover wonderfull posts
              created by the Reader community
            </p>
          </div>
          {user ? (
            <a
              href="/posts/create"
              className={buttonVariants({
                className: "w-full mb-2",
              })}
            >
              Create Post
            </a>
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({
                className: "w-full mb-2",
              })}
            >
              Create Post
            </Link>
          )}
          <a
            href="/posts"
            className={buttonVariants({
              className: "w-full mb-2",
              variant: "subtle",
            })}
          >
            Browse posts
          </a>
        </div>
      </div>
    </>
  );
};
