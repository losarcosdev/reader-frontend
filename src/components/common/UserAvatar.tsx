"use client";
import { Avatar } from "@radix-ui/react-avatar";
import { Icons } from "./Icons";
import Image from "next/image";
import { Session } from "next-auth";

interface Props {
  user: Session["user"];
  displayName: boolean;
}

export const UserAvatar = ({ user, displayName }: Props) => {
  return (
    <>
      <Avatar>
        {user?.image ? (
          <Image
            alt={`${user?.name}`}
            src={`${user?.image}`}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <Icons.user className="w-4 h-4" />
        )}
      </Avatar>
      {displayName && (
        <p className="tracking-tighter font-medium hidden sm:block">
          {user?.name?.split(" ", 1)}
        </p>
      )}
    </>
  );
};
