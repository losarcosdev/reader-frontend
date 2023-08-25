"use client";
import { ImageIcon, Link2 } from "lucide-react";
import { Input } from "./Input";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  userAvatar: {
    name?: string;
    email?: string;
    image?: string;
  };
  url?: string;
}

export const CreatePostBar = ({ userAvatar, url }: Props) => {
  const pathname = usePathname();

  if (pathname.split('/').length > 3) {
    return <></>;
  }

  return (
    <Link
      href={url ? url : `${pathname}/submit`}
      className="relative overflow-hidden rounded-md bg-white shadow-sm block"
    >
      <div className="h-full px-6 py-4 gap-3 flex items-center">
        <UserAvatar user={userAvatar} displayName={false} />
        <Input
          readOnly
          placeholder="Create Post"
          className="hover:opacity-75 duration-100"
        />
        <ImageIcon className="text-zinc-600" />
        <Link2 className="text-zinc-600" />
      </div>
    </Link>
  );
};
