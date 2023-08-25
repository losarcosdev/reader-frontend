import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  SignOutBtn,
  UserAvatar,
} from "@/components/common";
import { Session } from "@/interfaces";

import Link from "next/link";

interface Props {
  user: Session;
}

export const UserAccountNav = ({ user }: Props) => {
  const userAvatar = {
    image: user.image,
    email: user.email,
    name: user.name,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-3">
          <UserAvatar user={userAvatar} displayName={true} />
          <Icons.arrowDownFill />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel className="font-medium tracking-tighter text-center flex flex-col">
          <span>Welcome</span>
          <p>{user.name}!</p>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-gray-400 font-light">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href={`/user/${user.username}`}>Profile</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/c/create"}>Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
