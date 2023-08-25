import React from "react";

interface Props {
  profileImage: string;
  username: string;
  fullName: string;
}

export const UserHeader = ({ fullName, profileImage, username }: Props) => {
  return (
    <header className="flex flex-col gap-2 items-center justify-center w-full md:h-[60vh] bg-white shadow-sm p-5 rounded-md">
      <img
        className="rounded-full w-32 h-32 object-cover"
        src={profileImage}
        alt={fullName}
      />
      <h1 className="font-bold text-4xl text-zinc-800 text-center">
        {fullName}
      </h1>
      <h2 className="text-zinc-500 text-xl text-center">{username}</h2>
    </header>
  );
};
